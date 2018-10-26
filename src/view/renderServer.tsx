import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { Request } from 'express';
import fs from 'fs';
import fetch from 'isomorphic-fetch';
import path from 'path';
import React from 'react';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

import App from './App';

type HelmetFilledContext = {
  helmet: {
    title: string;
  };
};

export default async function renderServer({ req }: { req: Request }) {
  const stats = JSON.parse(
    await readFileAsync(
      path.resolve(__dirname, '../../react-loadable.json'),
      'utf-8'
    )
  );
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'same-origin',
      fetch,
      headers: {
        cookie: req.header('Cookie'),
      },
      uri: 'http://localhost:4000/graphql',
    }),
    ssrMode: true,
  });

  console.log({ url: req.url });
  const routerContext = {};
  const helmetContext = {};
  const modules: any[] = [];
  const app = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={routerContext}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </ApolloProvider>
    </Loadable.Capture>
  );
  await Loadable.preloadAll();
  const appAsString = await renderToStringWithData(app);
  const bundles = getBundles(stats, modules);

  const uniqueBundles = [...new Set(bundles.map(item => item))];

  const title =
    (helmetContext as HelmetFilledContext).helmet.title || 'Microlithic App';

  const script = `
  <script>
    window.__APOLLO_STATE__=${JSON.stringify(client.extract())};
  </script>
  ${uniqueBundles
    .map(bundle => `<script src="/${bundle.file}"></script>`)
    .join('\n')}`;

  const head = '';
  return { app: appAsString, script, head, title };
}
