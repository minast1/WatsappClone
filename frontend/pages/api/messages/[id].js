import prisma from '../../../src/prisma'

import { getSession } from 'next-auth/client'

export default async function handle(req, res) {
    const { query: { id: id } } = req
    // const session = await getSession({ req })
    const messages = await prisma.message.findMany({
        where: {
            chatId: Number(id) //? Number(id) : undefined
        },

        include: {
            owner: true
        }

    })

    res.json(messages)
}