import * as React from 'react';

import Layout from '../../../../layout/Layout';

type Props = {
  doLogin: (email: string, password: string) => Promise<boolean>;
};

type State = {
  email: string;
  password: string;
};

export default class LoginForm extends React.Component<Props, State> {
  public state = {
    email: '',
    password: ''
  };
  private form: React.RefObject<HTMLFormElement> = React.createRef();
  public render() {
    const { email, password } = this.state;

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
          <div>
            <button>Login</button>
          </div>
        </form>
      </Layout>
    );
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { doLogin } = this.props;
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await doLogin(email, password);
    } catch (err) {
      console.error(err);
    }
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
