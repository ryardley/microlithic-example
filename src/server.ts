import express from 'express';
import fs from 'fs';
import flow from 'lodash/flow';
import path from 'path';
import { applyMiddleware as serveView } from 'tsmill/server';
import { promisify } from 'util';
import serveCommands from './commands';
import serveGateway from './gateway';
import purgeCache from './purgeCache';
import serveQueries from './queries';
import serveRoutes from './routes';

const PORT = 4000 || process.env.PORT;

const readFileAsync = promisify(fs.readFile);

function requireDefaultUncachedInDev(moduleName: string) {
  if (process.env.NODE_ENV === 'development') {
    purgeCache(moduleName);
  }
  return require(moduleName).default;
}

function interpolateTemplate(
  template: string,
  renderedData: { [k: string]: any }
) {
  const entries = Object.entries(renderedData) as Array<[string, any]>;
  return entries.reduce((tpl: string, [k, v]) => {
    return !v ? tpl : tpl.replace(`<!--${k}-->`, v);
  }, template);
}

async function servePageTemplate({
  template,
  renderer,
}: {
  template: string;
  renderer: string;
}) {
  const html = await readFileAsync(template, 'utf-8');
  return (app: express.Application) => {
    app.use(async (req, res) => {
      const renderServer = requireDefaultUncachedInDev(renderer);
      const renderedData = await renderServer({ req });
      res.send(interpolateTemplate(html, renderedData));
    });
    return app;
  };
}

const startServer = async () => {
  const renderer = path.resolve(__dirname, './view/renderServer');
  const template = 'public/index.html.template';
  try {
    // express app and middleware
    const app = flow(
      serveGateway,
      serveRoutes,
      serveView,
      await servePageTemplate({
        renderer,
        template,
      })
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
