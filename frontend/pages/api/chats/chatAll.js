import { PrismaClient } from '@prisma/client'
//import { getSession } from 'next-auth/client'




export default async function handle(req, res) {

    // const session = await getSession({ req })
    const userEmail = req.query.email
    const prisma = new PrismaClient()

    const UserChats = await prisma.chat.findMany({
        where: { owner: { email: userEmail } },
        include: {
            messages: true,
            owner: true
        }
    })

    res.json(UserChats)
    // res.end()
}