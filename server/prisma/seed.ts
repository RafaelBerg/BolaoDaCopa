import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data : {
            name: "John Doe",
            email: "Jonh.doe@gmail.com",
            avatarUrl: "https://github.com/RafaelBerg.png",
        }
    })
    const pool = await prisma.pool.create({
        data: {
            title: "Example Pool",
            code: "BOL123",
            OwnerID: user.id,
        
            participants: {
                create:{
                    userId: user.id
                }    
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-24T16:00:00.449Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "SR"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-28T13:00:00.449Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "SU",
        
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolID: {
                                userId: user.id,
                                poolID: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-12-02T16:00:00.449Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "CM"
        }
    })
}

main()