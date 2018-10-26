import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

declare global {
  // tslint:disable
  interface Window {
    // tslint:enable
    __APOLLO_STATE__: any;
  }
}

const browserClient = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  uri: 'http://localhost:4000/graphql',
});

type Props = {
  client: ApolloClient<{}>;
};

const HotBrowserApp = hot(module)(({ client }: Props) => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </ApolloProvider>
));
Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <HotBrowserApp client={browserClient} />,
    document.getElementById('root') as HTMLElement
  );
});
