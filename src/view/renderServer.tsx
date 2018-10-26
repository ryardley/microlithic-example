import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { Request } from 'express';
import fetch from 'isomorphic-fetch';
import React from 'react';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import App from './App';

type HelmetFilledContext = {
  helmet: {
    title: string;
  };
};

export default async function renderServer({ req }: { req: Request }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      fetch,
      uri: 'http://localhost:4000/graphql',
    }),
    ssrMode: true,
  });
  // console.log({ url: req.url });
  const routerContext = {};
  const helmetContext = {};
  const app = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={routerContext}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </ApolloProvider>
  );

  const appAsString = await renderToStringWithData(app);
  // const appAsString = '';
  const title =
    (helmetContext as HelmetFilledContext).helmet.title || 'Microlithic App';
  // const title = '<title>Microlithic App Example</title>';
  const script = `
  <script>
    window.__APOLLO_STATE__=${JSON.stringify(client.extract())};
  </script>
  `;
  // const script = '';
  const head = '';
  return { app: appAsString, script, head, title };
}
