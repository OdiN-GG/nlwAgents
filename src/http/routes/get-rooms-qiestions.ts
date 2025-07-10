import {  type FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { schema } from "../../db/schema/index.ts";
import { db } from "../../db/connection.ts";
import { eq } from "drizzle-orm";

export const listQuestions: FastifyPluginAsyncZod = async (app) => {
    app.get("/:roomId/questions",
        {schema:{
            params: z.object({
                roomId: z.string()
            })
        }},
        async (request, reply) => {
            const data = await db
            .select(
                {
                    id: schema.questions.id,
                    description: schema.questions.description
                }
            )
            .from(schema.questions)
            .where(eq(schema.questions.roomId, request.params.roomId))
            .orderBy(schema.questions.createDeflate);


            return reply.send(data);
    })
}