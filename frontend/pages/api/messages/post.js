import prisma from '../../../src/prisma'
import { getSession } from 'next-auth/client'
import fs from 'fs'
import path from 'path'
import Pusher from 'pusher'
const formidable = require('formidable-serverless');



const createMessage = async (session, message, id, file) => {
    const Chatmessage = await prisma.message.create({
        data: {
            body: message === '' ? null : message,
            userId: session.id,
            chatId: Number(id),
            file: file === undefined ? null : file.name
        }
    })
    Chatmessage.owner = session.user
    return Chatmessage
}



export const config = {
    api: {
        bodyParser: false,
    }
}

export default async (req, res) => {
    const session = await getSession({ req });
    const { user } = session

    // fs.mkdir(`./public/${user.id}`, { recursive: true }, (err) => {
    //  if (err) {
    //       res.send(JSON.stringify(err))
    //   }
    // })
    const data = await new Promise((resolve, reject) => {
        try {
            const form = new formidable.IncomingForm({
                keepExtensions: true,
                multiples: false,
                uploadDir: `./public/${user.id}`

            });

            form.parse(req, async (err, fields, files) => {
                const { message, id } = fields;
                const { file } = files;

                if (file) {

                    fs.renameSync(file.path, `public/${user.id}/${file.name}`)

                }
                const Chatmessage = await createMessage(session, message, id, file)
                res.json(Chatmessage)

            })
        } catch (error) {
            resolve(res.status(403).send(error))
        }

    })

    // pusher.trigger('messages', 'inserted', Chatmessage);

    res.end()

}