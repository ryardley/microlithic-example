import gql from 'graphql-tag';
import * as React from 'react';
import { Query, withApollo, WithApolloClient } from 'react-apollo';
import { Link } from 'react-router-dom';
import { NavigationData } from './types/NavigationData';

type Props = {};

const NAVIGATION_DATA_QUERY = gql`
  query NavigationData {
    currentUser {
      email
    }
  }
`;

class Navigation extends React.Component<WithApolloClient<Props>> {
  public render() {
    return (
      <Query<NavigationData> query={NAVIGATION_DATA_QUERY}>
        {({ data }) => {
          if (!data) {
            return null;
          }
          const { currentUser } = data;
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/">Dashboard</Link>
              {(!currentUser || !currentUser.email) && (
                <React.Fragment>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </React.Fragment>
              )}
              {currentUser &&
                currentUser.email && (
                  <a href="#" onClick={this.handleLogoutClicked}>
                    Logout
                  </a>
                )}
            </div>
          );
        }}
      </Query>
    );
  }

  public handleLogoutClicked = async (
    e: React.SyntheticEvent<HTMLAnchorElement>
  ) => {
    const { client } = this.props;
    e.preventDefault();
    await client.mutate({
      mutation: gql`
        mutation LogoutUser {
          logout
        }
      `
    });
    await client.resetStore();
  };
}

export default withApollo<Props>(Navigation);
