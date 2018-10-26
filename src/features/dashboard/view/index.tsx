import * as React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from './pages/Dashboard';

export default () => (
  <Switch>
    <Route path="/" exact={true} component={Dashboard} />
  </Switch>
);
