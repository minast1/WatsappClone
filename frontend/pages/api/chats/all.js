import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'
import jwt from 'next-auth/jwt'
//setOptions({ site: process.env.NEXTAUTH_URL })


export default async (req, res) => {
    const { user } = await getSession({ req })
    if (user) {
        const prisma = new PrismaClient()

        const UserChats = await prisma.chat.findMany({
            where: { owner: { email: user.email } },
            include: {
                messages: {
                    include: {
                        owner: true
                    }
                }

            }
        })

        res.json(UserChats)
    }
    else {
        res.send('Access Denied')
    }
}

