import { fastify as kartolo } from "fastify";
import swaggerPlugin from "@fastify/swagger";
import swaggerUiPlugin from "@fastify/swagger-ui";

const ngatno = async () => {
  const sugio = kartolo({});

  // register swagger
  await sugio.register(swaggerPlugin, {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "code", description: "Code related end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["id", "email"],
          properties: {
            id: { type: "string", format: "uuid" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  });

  await sugio.register(swaggerUiPlugin, {
    routePrefix: "/documentation",
  });

  const port = 3000;
  const url = "localhost";
  const baseUrlApi = "/api/tefa";

  sugio.route({
    method: "GET",
    url: "/",

    handler: function (request, reply) {
      reply.send({ hello: "world" });
    },
  });

  sugio.put(
    "/some-route/:id",
    {
      schema: {
        description: "post some data",
        tags: ["user", "code"],
        summary: "qwerty",
        params: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "user id",
            },
          },
        },
        body: {
          type: "object",
          properties: {
            hello: { type: "string" },
            obj: {
              type: "object",
              properties: {
                some: { type: "string" },
              },
            },
          },
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              hello: { type: "string" },
            },
          },
          default: {
            description: "Default response",
            type: "object",
            properties: {
              foo: { type: "string" },
            },
          },
        },
        security: [
          {
            apiKey: [],
          },
        ],
      },
    },
    (req, reply) => {}
  );

  // route
  sugio.post(`${baseUrlApi}/organization`, (request, reply) => {
    reply.send("world");
  });

  sugio.get(`${baseUrlApi}/organization`, (request, reply) => {
    reply.send("get");
  });

  sugio.put(`${baseUrlApi}/organization`, (request, reply) => {
    reply.send("put");
  });

  sugio.delete(`${baseUrlApi}/organization`, (request, reply) => {
    reply.send("delete");
  });

  // close route
  sugio.listen({ port, host: "::" }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info(`API Server ready at ${url}:${port}`);
  });
};

ngatno();
