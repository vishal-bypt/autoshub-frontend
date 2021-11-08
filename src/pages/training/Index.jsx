import React from "react";
import { Route, Switch } from "react-router-dom";

import { List1 } from "./List";
import { AddEdit } from "./AddEdit";
import { EditTraining } from "./EditTraining";
import { AssignUsers } from "./AssignUsers";
import { UploadPrequisites } from "./UploadPrequisites";
import { UploadFieldList } from "./UploadFieldList";
import { EditTrainingList } from "./EditTrainingList";
import { GetTrainingByRole } from "./GetTrainingByRole";
import { AllNominations } from "./AllNominations";
import { Trainings } from "./Trainings";
import { RoleWiseTile } from "./RoleWiseTile";
import { Attendance } from "./Attendance";
// import { UploadFiles } from "./UploadFiles";

function Training({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}/list`} component={List1} />
      <Route exact path={`${path}/Attendance`} component={Attendance} />
      <Route exact path={path} component={RoleWiseTile} />
      <Route exact path={`${path}/add`} component={AddEdit} />
      <Route
        exact
        path={`${path}/uploadPrequisites`}
        component={UploadPrequisites}
      />
      <Route
        exact
        path={`${path}/getAllByRole`}
        component={GetTrainingByRole}
      />
      <Route exact path={`${path}/getAll`} component={Trainings} />
      <Route
        exact
        path={`${path}/getAllNominations`}
        component={AllNominations}
      />
      <Route exact path={`${path}/editList`} component={EditTrainingList} />
      <Route exact path={`${path}/edit/:id`} component={EditTraining} />
      <Route exact path={`${path}/assign/:id`} component={AssignUsers} />
      <Route exact path={`${path}/uploadList`} component={UploadFieldList} />
      {/* <Route exact path={`${path}/uploadFiles`} component={UploadFiles} /> */}
    </Switch>
  );
}

export { Training };
