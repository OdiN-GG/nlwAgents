import { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../db/connection.ts";
import {schema} from "../db/schema/index.ts"
    

export const Rotas: FastifyPluginCallbackZod = async (app) => {
    app.get("/rooms", async () => {
        const data = await db
            .select(
            )
            .from(schema.rooms);
        return data;
    });
}  