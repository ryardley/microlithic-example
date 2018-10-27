import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { Request } from 'express';
import fs from 'fs';
import fetch from 'isomorphic-fetch';
import path from 'path';
import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { StaticRouter } from 'react-router';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

import App from './App';

type HelmetFilledContext = {
  helmet?: {
    title: string;
  };
};

function renderApolloState(state: any) {
  return `<script>window.__APOLLO_STATE__=${JSON.stringify(state)};</script>`;
}

function renderBundles(
  bundles: Array<{ file: string }>,
  publicPath: string = ''
) {
  return bundles
    .map(bundle => `<script src="${publicPath}${bundle.file}"></script>`)
    .join('');
}

// This is a bit tricky so I added some comments
export default async function renderServer({ req }: { req: Request }) {
  // Pull in stats file to find codesplit client bundles
  const stats = JSON.parse(
    await readFileAsync(
      path.resolve(__dirname, '../react-loadable.json'),
      'utf-8'
    )
  );

  // Setup apollo client
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

  // Variarbles to capture information about rendering
  const routerContext = {};
  const hctx: HelmetFilledContext = {};

  // Create the component tree
  const appTree = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={routerContext}>
        <HelmetProvider context={hctx}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </ApolloProvider>
  );

  // Preload all loadable components in the component tree
  await Loadable.preloadAll();

  // Fetch all apollo queries from the tree (causes a tree render)
  await getDataFromTree(appTree);

  // Create an array to capture modules
  const modules = Array<string>();

  // Render the final output capturing loadable modules to a modules array
  const app = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      {appTree}
    </Loadable.Capture>
  );

  // Extract the bundles from the stats json
  const bundles = getBundles(stats, modules);

  // return data for templating
  return {
    app,
    script: `${renderApolloState(client.extract())}${renderBundles(bundles)}`,
    title: (hctx.helmet && hctx.helmet.title) || 'Microlithic App',
  };
}
