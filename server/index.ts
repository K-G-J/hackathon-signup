import { context } from './graphql/context';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers, context });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}
startServer();
