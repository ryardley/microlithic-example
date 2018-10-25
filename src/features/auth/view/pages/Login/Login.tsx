import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { LoginUser, LoginUserVariables } from './types/LoginUser';

type Props = {};

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
class Register extends React.Component<
  WithApolloClient<RouteComponentProps<Props>>
> {
  public render() {
    return <LoginForm doLogin={this.doLogin} />;
  }

  private doLogin = async (email: string, password: string) => {
    const { client, history } = this.props;
    const { errors } = await client.mutate<LoginUser, LoginUserVariables>({
      errorPolicy: 'all',
      mutation: LOGIN_USER_MUTATION,
      variables: { email, password },
    });

    if (!errors) {
      await client.resetStore();
      history.push('/');
      return { errors: [] };
    }

    return { errors };
  };
}

export default withApollo<Props>(withRouter(Register));
