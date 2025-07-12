import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { env } from './env.ts';
import {listRooms} from "./http/routes/get-rooms.ts"
import { createRooms } from './http/routes/post-rooms.ts';
import {listQuestions} from "./http/routes/get-rooms-qiestions.ts"

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", async () => {
  return { status: 'Esta funcionando' };
});

app.register(listRooms)

app.register(createRooms)

app.register(listQuestions)

app.listen({
  port: env.PORT
}).then(() => {
  console.log(`Servidor Onn`);
})