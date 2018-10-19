import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import Layout from '../../../layout/view';
import { GetCurrentUser } from './types/GetCurrentUser';

const DASHBOARD_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      email
    }
  }
`;

export default () => (
  <Query<GetCurrentUser> query={DASHBOARD_QUERY}>
    {({ loading, data }) => {
      if (loading || !data) {
        return (
          <Layout>
            <h1>Loading...</h1>
          </Layout>
        );
      }
      if (!data.currentUser) {
        return (
          <Layout>
            <h1>No Authorized User</h1>
          </Layout>
        );
      }

      return (
        <Layout>
          <h1>You are logged in as: {data.currentUser.email}</h1>
        </Layout>
      );
    }}
  </Query>
);
