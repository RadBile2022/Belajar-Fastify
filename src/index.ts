import { fastify } from "fastify";
import swaggerPlugin from "@fastify/swagger";

const server = async () => {
  const app = fastify({});

  // register swagger
  await app.register(swaggerPlugin, {});
  const port = 3000;
  const url = "localhost";
  const baseUrlApi = "/api/tefa";
  // route
  app.post(`${baseUrlApi}/organization`, (request, reply) => {});

  // close route
  app.listen({ port, host: "::" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`API Server ready at ${url}:${port}`);
  });
};

server();
