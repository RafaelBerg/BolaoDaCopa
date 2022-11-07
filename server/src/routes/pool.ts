import { FastifyInstance } from "fastify"
import ShortUniqueId from "short-unique-id"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { authenticate } from "../plugins/authenticate"

export async function poolRoutes(fastify: FastifyInstance){
    
    fastify.get("/pools/count", async () => {
        const count = await prisma.pool.count()
        
        return {count}
    })

    fastify.post("/pools", async (request, reply) => {
        
        /* sinaliza erro se criar um bolão sem titulo - (usando zod) */
        const createPoolBody = z.object({
            title: z.string(),
        })

        const { title } = createPoolBody.parse(request.body)
        
        const generate = new ShortUniqueId({length: 6})
        const code = String(generate()).toUpperCase()

        try {
            await request.jwtVerify()
            
            await prisma.pool.create({
                data: {
                    title,
                    code,
                    OwnerID: request.user.sub,

                    participants: {
                        create: {
                            userId: request.user.sub,
                        }
                    }
                }
            })
        }
        catch(err){
            await prisma.pool.create({
                data: {
                    title,
                    code,
                }
            })
        }

        

        return reply.status(201).send({ code })
    })

    fastify.post("/pools/join", {
        onRequest: [authenticate]
    }, async (request, reply) => {
        const joinPoolbody = z.object({
            code: z.string(),
        })

        const { code } = joinPoolbody.parse(request.body)
    
        const pool = await prisma.pool.findUnique({
            where: {
                code,
            },
            include: {
                participants: {
                    where: {
                        userId: request.user.sub
                    }
                }
            }
        })

        if (!pool){
            return reply.status(400).send({
                message: "Pool not found."
            })
        }

        if (pool.participants.length > 0){
            return reply.status(400).send({
                message: "You already joined this pool."
            })
        }

        if (!pool.OwnerID){
            await prisma.pool.update({
                where: {
                    id: pool.id,
                },
                data: {
                    OwnerID: request.user.sub,
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolID: pool.id,
                userId: request.user.sub,
            }
        })

        return reply.status(201).send()
    })

    fastify.get("/pools", {
        onRequest: [authenticate]
    }, async (request) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                         userId: request.user.sub
                    }                            
                }
            },
            include: {
                _count: {
                    select: {
                        participants: true
                    }
                },
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
        return { pools }
    })

    fastify.get("/pools/:id", {
        onRequest: [authenticate]
    }, async (request) => {
        const getPoolParams = z.object({
            id: z.string(),
        })

        const { id } = getPoolParams.parse(request.params)

        const pool = await prisma.pool.findUnique({         
            where: {
                id,
            },
            include: {
                _count: {
                    select: {
                        participants: true
                    }
                },
                participants: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })
        return { pool }
    })

}

