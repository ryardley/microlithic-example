import * as React from 'react';

import { GraphQLError } from 'graphql';
import Layout from '../../../../layout/view';

type Props = {
  doRegistration: (
    email: string,
    password: string,
    role: string
  ) => Promise<{ errors: ReadonlyArray<GraphQLError> }>;
};

type State = {
  email: string;
  password: string;
  registered: boolean;
  errors?: ReadonlyArray<GraphQLError>;
};

export default class LoginForm extends React.Component<Props, State> {
  public state = {
    email: '',
    errors: Array<GraphQLError>(),
    password: '',
    registered: false
  };
  private form: React.RefObject<HTMLFormElement> = React.createRef();
  public render() {
    const { email, password, registered, errors } = this.state;
    if (registered) {
      return (
        <Layout>
          <div>
            <h1>Thank you</h1>
            <div>Thank you for registering</div>
          </div>
        </Layout>
      );
    }
    return (
      <Layout>
        <form ref={this.form} onSubmit={this.handleSubmit}>
          <h1>Register</h1>
          <div>
            <input
              autoComplete="register.email"
              type="text"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div>
            <input
              autoComplete="register.password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          {errors.map(error => (
            <div style={{ color: 'red' }}>{error.message}</div>
          ))}
          <div>
            <button>Register</button>
          </div>
        </form>
      </Layout>
    );
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { doRegistration } = this.props;
    const { email, password } = this.state;
    const { errors } = await doRegistration(email, password, 'user');

    this.setState({ errors, registered: errors && errors.length === 0 });
  };

  private handleChange = () => {
    if (this.form.current) {
      const form = this.form.current;
      const emailField = form.email;
      const passwordField = form.password;
      this.setState({
        email: emailField.value,
        password: passwordField.value
      });
    }
  };
}
