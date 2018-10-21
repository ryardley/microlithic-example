import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { apolloContext as context } from './features/auth/gateway';
import { resolvers, typeDefs } from './features/auth/routes';

export default function applyRoutes(app: Application) {
  const server = new ApolloServer({
    context,
    resolvers,
    typeDefs
  });
  server.applyMiddleware({ app });
  return app;
}
