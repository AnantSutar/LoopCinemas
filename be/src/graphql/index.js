const { buildSchema } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");

const graphql = { };

graphql.schema = buildSchema(


    
);

  // Set up Express and Apollo Server Middleware
(async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 8000;

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Apollo Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();