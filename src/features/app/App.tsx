import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import Auth from '../auth/Auth';
import Dashboard from '../dashboard/Dashboard';

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

export default App;
