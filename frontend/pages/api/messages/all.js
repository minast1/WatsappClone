import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'


const prisma = new PrismaClient()

export default async function handle(req, res) {

    let messages = await prisma.message.findMany({
        orderBy: {
            createdAt: "asc"
        },
        include: { owner: true }
    })


    res.status(200).json(messages)
}