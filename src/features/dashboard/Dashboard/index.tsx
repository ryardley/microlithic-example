import * as React from "react";
import { Route, Switch } from "react-router";
import Me from "./pages/Me";

export default () => (
  <Switch>
    <Route path="/" exact={true} component={Me} />
  </Switch>
);
