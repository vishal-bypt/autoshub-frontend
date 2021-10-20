import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./List";

function User({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={List} />
    </Switch>
  );
}

export { User };
