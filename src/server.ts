import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import { env } from './env.ts';
import {Rotas} from "./http/route.ts"



const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get("/health", async () => {
  return { status: 'Esta funcionando' };
});

app.register(Rotas)

app.listen({
  port: env.PORT
}).then(() => {
  console.log(`Servidor Onn`);
})