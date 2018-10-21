import * as React from 'react';
import routeLoader from '../../../view/routeLoader';

import { Route, Switch } from 'react-router';

const Login = routeLoader(() => import('./pages/Login'));
const Register = routeLoader(() => import('./pages/Register'));

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);
