import {  type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import {schema} from "../../db/schema/index.ts"
    

export const listRooms: FastifyPluginCallbackZod = async (app) => {
    app.get("/rooms", async () => {
        const data = await db
            .select(
                {
                    id: schema.rooms.id,
                    name: schema.rooms.name,
                    description: schema.rooms.description
                }
            )
            .from(schema.rooms)
            .orderBy(schema.rooms.name)
            .execute()
            ;
        return data;
    });
}  