import prisma from '../../../src/prisma'

import { getSession } from 'next-auth/client'

export default async function handle(req, res) {

    let messages = await prisma.message.findMany({
        orderBy: {
            createdAt: "asc"
        },
        include: { owner: true }
    })


    res.status(200).json(messages)
}