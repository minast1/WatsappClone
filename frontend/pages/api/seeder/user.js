import prisma from '../../../src/prisma'
import faker from 'faker'


export default async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            image: faker.image.people()
        }
    })
    res.json(user)
}


