import * as React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
