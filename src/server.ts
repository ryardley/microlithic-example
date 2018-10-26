// import decache from 'decache';
import express from 'express';
import fs from 'fs';
import flow from 'lodash/flow';

import { applyMiddleware as serveView } from 'tsmill/server';
import { promisify } from 'util';
import serveCommands from './commands';
import serveGateway from './gateway';
import serveQueries from './queries';
import serveRoutes from './routes';
import renderServer from './view/renderServer';

const PORT = 4000 || process.env.PORT;

const readFileAsync = promisify(fs.readFile);

function interpolateTemplate(
  template: string,
  renderedData: { [k: string]: any }
) {
  const entries = Object.entries(renderedData) as Array<[string, any]>;
  return entries.reduce((tpl: string, [k, v]) => {
    return !v ? tpl : tpl.replace(`<!--${k}-->`, v);
  }, template);
}

async function servePageTemplate(templatePath: string) {
  const template = await readFileAsync(templatePath, 'utf-8');
  return (app: express.Application) => {
    app.use(async (req, res) => {
      const renderedData = await renderServer({ req });
      res.send(interpolateTemplate(template, renderedData));
    });
    return app;
  };
}

const startServer = async () => {
  try {
    // express app and middleware
    const app = flow(
      serveGateway,
      serveRoutes,
      serveView,
      await servePageTemplate('public/index.html.template')
    )(express());

    // start command and query listeners
    // as effectively separate processes
    // they are not exposed to the web
    // but receive events via the event bus
    await serveCommands();
    await serveQueries();

    // app.get('/foo', async (req, res) => {
    //   decache('./foo');
    //   const { default: foo } = await import('./foo');
    //   foo(req, res);
    // });

    app.listen({ port: PORT }, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
