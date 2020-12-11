import prisma from '../../../src/prisma'
import faker from 'faker'


export default async (req, res) => {
    const chatMessage = await prisma.chat.create({
        data: {
            name: faker.name.firstName(),
            userId: faker.random.number({
                min: 1,
                max: 11
            })
        }
    })
    res.json(chatMessage)
}


