import gql from 'graphql-tag';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import RegisterForm from './RegisterForm';
import { RegisterUser, RegisterUserVariables } from './types/RegisterUser';

type Props = {};
type State = {};

const REGISTER_MUTATION = gql`
  mutation RegisterUser($email: String!, $password: String!, $role: String!) {
    register(email: $email, password: $password, role: $role)
  }
`;

class Register extends React.Component<WithApolloClient<Props>, State> {
  public render() {
    return <RegisterForm doRegistration={this.doRegistration} />;
  }

  public doRegistration = async (
    email: string,
    password: string,
    role: string
  ) => {
    const { client } = this.props;

    const { errors } = await client.mutate<RegisterUser, RegisterUserVariables>(
      {
        errorPolicy: 'all',
        mutation: REGISTER_MUTATION,
        variables: { email, password, role }
      }
    );
    await client.resetStore();

    return errors ? { errors } : { errors: [] };
  };
}

export default withApollo<Props>(Register);
