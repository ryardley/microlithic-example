import { Application, Request } from 'express';
import session from 'express-session';
import { AccessContext, UserToken } from '../types';
export function applyMiddleware({ app }: { app: Application }) {
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
    doLogin: (userToken: UserToken) => {
      if (req && req.session) {
        req.session.userToken = userToken;
      }
    },
    doLogout: () => {
      if (req && req.session) {
        delete req.session.userToken;
      }
    },
    userToken: req && req.session && req.session.userToken
  };
}
