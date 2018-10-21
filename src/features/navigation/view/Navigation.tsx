import * as React from 'react';
import { Link } from 'react-router-dom';
import CurrentUserQuery from '../../auth/view/CurrentUserQuery';
import withLogoutUser, {
  WithLogoutUserProps
} from '../../auth/view/withLogoutUser';

type Props = {};

class Navigation extends React.Component<WithLogoutUserProps<Props>> {
  public render() {
    return (
      <CurrentUserQuery>
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
      </CurrentUserQuery>
    );
  }
  private handleLogoutClicked = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { doLogoutUser } = this.props;
    doLogoutUser();
  };
}

export default withLogoutUser<Props>(Navigation);
