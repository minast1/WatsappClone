import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'
import jwt from 'next-auth/jwt'
import prisma from '../../../src/prisma'
//setOptions({ site: process.env.NEXTAUTH_URL })


export default async (req, res) => {
    const { user } = await getSession({ req })
    if (user) {

        const UserChats = await prisma.chat.findMany({
            where: { owner: { email: user.email } },
            include: {
                owner: true,
                messages: {
                    include: {
                        owner: true
                    }
                },
                participants: {
                    select: {
                        participant: {
                            select: {
                                image: true,
                                name: true
                            }
                        }
                    }
                }

            }
        })
        /*await Promise.all(UserChats?.map(async (chat) => {
            const chatParticipants = await prisma.usersonchat.findMany({
                where: {
                    chatId: chat.id
                },
                include: {
                    participant: {
                        select: {
                            image: true
                        }
                    }
                }
            })
        })) 
        chat.participants = chatParticipants */
        res.json(UserChats)
    }
    else {
        res.send('Access Denied')
    }
}

