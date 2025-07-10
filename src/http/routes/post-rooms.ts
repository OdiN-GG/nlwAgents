import { type FastifyPluginCallback } from "fastify"
import { z } from "zod/v4"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"

export const createRooms: FastifyPluginCallback = async (app) => {
    app.post("/rooms",
        {
            schema:{
                body: z.object({
                    name: z.string().min(2),
                    description: z.string().optional()
                })
            }
        }, 
        async (request, reply)=>{
            
            const bodySchema = z.object({
                name: z.string().min(2),
                description: z.string().optional()
            })
           
            const { name, description } = bodySchema.parse(request.body);
            
            const result = await db.insert(schema.rooms).values({
                name,
                description
            }).returning()

            const data = result[0]

            return reply.send({ id: data.id});
    })
}