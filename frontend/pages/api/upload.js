// This is an example of how to read a JSON Web Token from an API route
import moment from 'moment'
import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/client'
import formidable from 'formidable-serverless'
//const formidable = require('formidable-serverless');


export const config = {
    api: {
        bodyParser: false,
    }
}

export default async (req, res) => {
    const { user } = await getSession({ req });

    const data = await new Promise((resolve, reject) => {
        try {
            const form = new formidable.IncomingForm({
                keepExtensions: true,
                multiples: false,
                uploadDir: `./public/${user.id}`

            });

            form.on('error', function (err) {
                console.log(err)
            })
            form.on('fileBegin', (name, file) => {
                fs.mkdir(`./public/${user.id}`, { recursive: true }, (err) => {
                    if (err) {
                        res.send(JSON.stringify(err))
                    }
                })
                const clientExtension = file.name.split('.').pop()
                file.name = `${Date.now()}.${clientExtension}`
                file.path = path.join(`public/${user.id}`, file.name)
            }).on("aborted", () => { console.log("Aborted...") })

                .on('end', () => {
                    console.log("Done!")//Save the file_name to the database 
                });

            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log(error)
                }
                if (files) {
                    fs.mkdir(`./public/${user.id}`, { recursive: true }, (err) => {
                        if (err) {
                            res.send(JSON.stringify(err))
                        }
                    })
                    const clientExtension = file.name.split('.').pop()
                    file.name = `${Date.now()}.${clientExtension}`
                    file.path = path.join(`public/${user.id}`, file.name)

                }
                if (fields) {
                    const { message, id } = fields


                }


            })
        } catch (error) {
            resolve(res.status(403).send(error))
        }

    })

    res.json(data)
}