import express from 'express';
import flow from 'lodash/flow';
import { applyMiddleware as serveView } from 'tsmill/server';

import serveCommands from './commands';
import serveGateway from './gateway';
import serveQueries from './queries';
import serveRoutes from './routes';

const PORT = 4000 || process.env.PORT;

const startServer = async () => {
  try {
    // express app and middleware
    const app = flow(
      serveGateway,
      serveRoutes,
      serveView
    )(express());

    // start command and query listeners
    // as effectively separate processes
    // they are not exposed to the web
    // but receive events via the event bus
    await serveCommands();
    await serveQueries();

    app.listen({ port: PORT }, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
