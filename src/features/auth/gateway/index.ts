import { Application, Request } from 'express';
import session from 'express-session';
import { AccessContext } from '../types';
import createStore from './store';

export default function apply(app: Application) {
  const store = createStore();

  app.use(
    session({
      cookie: {
        maxAge: 10 * 60 * 1000,
      },
      resave: false,
      saveUninitialized: true,
      secret: 'asdhasgdjhasgdjhas',
      store,
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
    userToken: req && req.session && req.session.userToken,
  };
}
