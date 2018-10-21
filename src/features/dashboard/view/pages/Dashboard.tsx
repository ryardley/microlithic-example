import * as React from 'react';
import CurrentUserQuery from '../../../auth/view/CurrentUserQuery';
import Layout from '../../../layout/view';

export default () => (
  <CurrentUserQuery>
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
  </CurrentUserQuery>
);
