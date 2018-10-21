import express from 'express';
import flow from 'lodash/flow';
import { applyMiddleware } from 'tsmill/server';
import { createConnection } from 'typeorm';
import commands from './commands';
import applyGateway from './gateway';
import queries from './queries';

const PORT = 4000 || process.env.PORT;

const startServer = async () => {
  try {
    await commands();
    await queries();
    await createConnection();

    const app = flow(
      applyGateway,
      applyMiddleware
    )(express());

    app.listen({ port: PORT }, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
