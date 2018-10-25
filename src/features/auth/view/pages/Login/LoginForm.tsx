import * as React from 'react';

import { GraphQLError } from 'graphql';
import Layout from '../../../../layout/view';

type LoginResponse = { errors: ReadonlyArray<GraphQLError> };

type Props = {
  doLogin: (email: string, password: string) => Promise<LoginResponse>;
};

type State = {
  email: string;
  errors?: ReadonlyArray<GraphQLError>;
  password: string;
};

export default class LoginForm extends React.Component<Props, State> {
  public state = {
    email: '',
    errors: Array<GraphQLError>(),
    password: '',
  };

  private form: React.RefObject<HTMLFormElement> = React.createRef();

  public render() {
    const { email, password, errors } = this.state;
    console.log({ errors });
    return (
      <Layout>
        <form ref={this.form} onSubmit={this.handleSubmit}>
          <h1>Login</h1>
          <div>
            <input
              autoComplete="login.email"
              type="text"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div>
            <input
              autoComplete="login.password"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          {errors.map(error => (
            <div key={error.name} style={{ color: 'red' }}>
              {error.message}
            </div>
          ))}
          <div>
            <button>Login</button>
          </div>
        </form>
      </Layout>
    );
  }

  public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { doLogin } = this.props;
    event.preventDefault();
    const { email, password } = this.state;
    const { errors } = await doLogin(email, password);
    if (errors.length) {
      this.setState({ errors });
    }
  };

  private handleChange = () => {
    if (this.form.current) {
      const form = this.form.current;
      const emailField = form.email;
      const passwordField = form.password;
      this.setState({
        email: emailField.value,
        password: passwordField.value,
      });
    }
  };
}
