const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Load schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch(error => {
  console.error('Error starting the server:', error);
});
