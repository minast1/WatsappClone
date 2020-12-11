import prisma from '../../../src/prisma'
import faker from 'faker'


export default async (req, res) => {
    const message = await prisma.message.create({
        data: {
            body: faker.lorem.words(),
            userId: faker.random.number({
                min: 1,
                max: 11
            }),
            chatId: faker.random.number({
                min: 1,
                max: 20
            }),
            isFile: false
        }
    })
    res.json(message)
}


