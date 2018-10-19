import * as React from 'react';
import { Route, Switch } from 'react-router';
import routeLoader from '../../utils/routeLoader';

const Dashboard = routeLoader(() => import('./pages/Dashboard'));

export default () => (
  <Switch>
    <Route path="/" exact={true} component={Dashboard} />
  </Switch>
);
