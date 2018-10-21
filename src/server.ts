import express from 'express';
import flow from 'lodash/flow';
import { applyMiddleware as serveView } from 'tsmill/server';

import listenForCommands from './commands';
import serveGateway from './gateway';
import listenForQueries from './queries';
import serveRoutes from './routes';

const PORT = 4000 || process.env.PORT;

const startServer = async () => {
  try {
    const app = flow(
      serveGateway,
      serveView,
      serveRoutes
    )(express());

    // start command and query listeners
    await listenForCommands();
    await listenForQueries();

    app.listen({ port: PORT }, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
