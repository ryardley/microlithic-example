import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import Layout from '../../../layout/ui';
import { GetMe } from './types/GetMe';

const DASHBOARD_QUERY = gql`
  query GetMe {
    me {
      email
    }
  }
`;

export default () => (
  <Query<GetMe> query={DASHBOARD_QUERY}>
    {({ loading, data }) => {
      if (loading || !data) {
        return (
          <Layout>
            <h1>Loading...</h1>
          </Layout>
        );
      }
      if (!data.me) {
        return (
          <Layout>
            <h1>No Authorized User</h1>
          </Layout>
        );
      }

      return (
        <Layout>
          <h1>You are logged in as: {data.me.email}</h1>
        </Layout>
      );
    }}
  </Query>
);
