import React from "react";
import { Route, Switch } from "react-router-dom";
import List from "./List";
import EditUser from "./EditUser";
import AddUsers from "./AddUsers";

function UserList({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={path} component={List} />
      <Route exact path={`${path}/editUser`} component={EditUser} />
      <Route exact path={`${path}/addUsers`} component={AddUsers} />
    </Switch>
  );
}

export { UserList };
