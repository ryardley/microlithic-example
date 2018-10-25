import { formatError } from 'apollo-errors';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { Application } from 'express';
import { apolloContext as context } from './features/auth/gateway';
import { resolvers, typeDefs } from './features/auth/routes';

const directiveResolvers = {
  hasRole: (next: () => void, source: any, foo: any, ctx: any) => {
    console.log({ hasRole: { source, foo, ctx } });
    next();
  },
};

export default function applyRoutes(app: Application) {
  new ApolloServer({
    context,
    formatError,
    schema: makeExecutableSchema({
      directiveResolvers,
      resolvers,
      typeDefs,
    }),
  }).applyMiddleware({ app });
  return app;
}
