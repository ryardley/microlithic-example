import * as React from 'react';
import { Route, Switch } from 'react-router';
import routeLoader from '../../utils/routeLoader';

const Me = routeLoader(() => import('./pages/Me'));

export default () => (
  <Switch>
    <Route path="/" exact={true} component={Me} />
  </Switch>
);
