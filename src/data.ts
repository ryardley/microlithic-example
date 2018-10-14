import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import proxy from 'http-proxy-middleware';
import { createConnection } from 'typeorm';
import { resolvers, typeDefs } from './schema';

const startServer = async () => {
  const app = express();

  app.use(
    session({
      cookie: {
        maxAge: 100000
      },
      resave: false,
      saveUninitialized: true,
      secret: 'asdhasgdjhasgdjhas'
    })
  );

  const server = new ApolloServer({
    context: ({ req }: { req: express.Request }) => ({ req }),
    resolvers,
    typeDefs
  });

  server.applyMiddleware({ app });

  await createConnection();
  app.use('/sockjs-node', proxy({ target: 'ws://localhost:4000/sockjs-node' }));
  app.use(proxy({ target: 'http://localhost:3000' }));

  const port = 4000;
  app.listen({ port }, () => {
    console.log(
      `Server listening at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
