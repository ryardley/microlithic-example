import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import Auth from '../features/auth/view';
import Dashboard from '../features/dashboard/view';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <React.Fragment>
            <Auth />
            <Dashboard />
          </React.Fragment>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default hot(module)(App);
