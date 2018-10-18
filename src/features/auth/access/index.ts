import { Application, Request } from 'express';
import session from 'express-session';
import store from '../store';
import { AccessContext } from '../types';

export function applyMiddleware({ app }: { app: Application }) {
  app.use(
    session({
      cookie: {
        maxAge: 100000
      },
      resave: false,
      saveUninitialized: true,
      secret: 'asdhasgdjhasgdjhas',
      store
    })
  );

  return app;
}

type ApolloContext = {
  req: Request;
};

export function apolloContext({
  req,
  ...context
}: ApolloContext): AccessContext {
  return {
    ...context,
    sid: req.sessionID,
    userToken: req && req.session && req.session.userToken
  };
}
