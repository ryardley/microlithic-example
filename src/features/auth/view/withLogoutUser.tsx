import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';

type LogoutFn = () => Promise<any>;
export type WithLogoutUserProps<P> = P & { doLogoutUser: LogoutFn };

export default function withLogoutUser<P extends object>(
  WrappedComponent: React.ComponentType<WithLogoutUserProps<P>>
) {
  return withApollo<{}>(
    class WithLogoutUser extends React.Component<WithApolloClient<{}>> {
      public render() {
        return (
          <WrappedComponent doLogoutUser={this.doLogoutUser} {...this.props} />
        );
      }

      public doLogoutUser = async () => {
        const { client } = this.props;
        await client.mutate({
          mutation: gql`
            mutation LogoutUser {
              logout
            }
          `,
        });
        await client.resetStore();
      };
    }
  );
}
