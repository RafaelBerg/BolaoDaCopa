import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import { poolRoutes } from "./routes/pool"
import { guessRoutes } from "./routes/guess"
import { userRoutes } from "./routes/user"
import { gameRoutes } from "./routes/game"
import { authRoutes } from "./routes/auth"

async function start() {
    try{
        const fastify = Fastify({
            logger: true,
        })
    
        await fastify.register(cors, {
            origin: true,
        })
    
        // Em produção precisa ser uma variavel ambiente
        await fastify.register(jwt, {
            secret: "BergCopa",
        })
    
        await fastify.register(poolRoutes)
        await fastify.register(guessRoutes)
        await fastify.register(userRoutes)
        await fastify.register(gameRoutes)
        await fastify.register(authRoutes)
    
        /* Para rodar versão web, precisa comentar o host */
        await fastify.listen({port: 3333, host: '0.0.0.0' })
    }
    catch(err){
        process.exit(1)
    }
    
}

start()