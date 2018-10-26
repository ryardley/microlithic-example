import * as React from 'react';
import Auth from '../features/auth/view';
import Dashboard from '../features/dashboard/view';

export default class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Auth />
        <Dashboard />
      </React.Fragment>
    );
  }
}
