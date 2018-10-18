import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import proxy from 'http-proxy-middleware';
import { createConnection } from 'typeorm';
import * as auth from './features/auth/access';
import { resolvers, typeDefs } from './features/auth/api';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    context: auth.apolloContext,
    resolvers,
    typeDefs
  });

  auth.applyMiddleware({ app });
  server.applyMiddleware({ app });

  await createConnection();
  app.use('/sockjs-node', proxy({ target: 'ws://localhost:4000/sockjs-node' }));
  app.use(proxy({ target: 'http://localhost:3000' }));

  const port = 4000;
  app.listen({ port }, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
};

startServer();
