import prisma from '../../../src/prisma'
import { getSession } from 'next-auth/client'
import fs from 'fs'
import path from 'path'
import Pusher from 'pusher'
const formidable = require('formidable-serverless');



const createMessage = async (user, message, id, check = false) => {
    const Chatmessage = await prisma.message.create({
        data: {
            body: message,
            owner: {
                connect: { email: user.email }
            },
            Chat: {
                connect: { id: Number(id) }
            },
            isFile: check
        }
    })
    Chatmessage.owner = user
    return Chatmessage
}



export const config = {
    api: {
        bodyParser: false,
    }
}

export default async (req, res) => {
    const { user } = await getSession({ req });

    fs.mkdir(`./public/${user.id}`, { recursive: true }, (err) => {
        if (err) {
            res.send(JSON.stringify(err))
        }
    })
    const data = await new Promise((resolve, reject) => {
        try {
            const form = new formidable.IncomingForm({
                keepExtensions: true,
                multiples: false,
                uploadDir: `./public/${user.id}`

            });

            form.parse(req, async (err, fields, files) => {
                const { message, id } = fields
                if (message) {
                    const Chatmessage = await createMessage(user, message, id);
                    res.json(Chatmessage)
                }

                if (files) {
                    const { file } = files;
                    const clientExtension = file.name.split('.').pop()
                    const filename = `${Date.now()}.${clientExtension}`
                    fs.renameSync(file.path, `public/${user.id}/${filename}`)
                    const Chatmessage = await createMessage(user, filename, id, true)
                    res.json(Chatmessage)
                }


            })
        } catch (error) {
            resolve(res.status(403).send(error))
        }

    })

    // pusher.trigger('messages', 'inserted', Chatmessage);

    res.end()

}