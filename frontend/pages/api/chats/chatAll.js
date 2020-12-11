import prisma from '../../../src/prisma'

//import { getSession } from 'nex




export default async function handle(req, res) {

    // const session = await getSession({ req })
    const userEmail = req.query.email
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