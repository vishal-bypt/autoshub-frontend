import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./List";
import EditUser from "./EditUser";

function UserList({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route exact path={`${path}/editUser`} component={EditUser} />
    </Switch>
  );
}

export { UserList };
