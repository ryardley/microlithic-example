import * as React from 'react';

import Layout from '../../../../layout/view';

type Props = {
  doRegistration: (
    email: string,
    password: string,
    role: string
  ) => Promise<boolean>;
};

type State = {
  email: string;
  password: string;
  registered: boolean;
};

export default class LoginForm extends React.Component<Props, State> {
  public state = {
    email: '',
    password: '',
    registered: false
  };
  private form: React.RefObject<HTMLFormElement> = React.createRef();
  public render() {
    const { email, password, registered } = this.state;
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

    this.setState({
      registered: await doRegistration(email, password, 'user')
    });
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
