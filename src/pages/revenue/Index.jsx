import React from "react";
import { Route, Switch } from "react-router-dom";

import { List } from "./List";
import { Resources } from "./Resources";
import { AddEdit } from "./AddEdit";
import { EditProgram } from "./EditProgram";
import { UploadProgramData } from "./UploadProgramData";
// import { NotFound } from "../_components";

function Revenue({ match }) {
  const { path } = match;

  return (
    <Switch>
      {/* <Route exact path={path} component={List} /> */}
      <Route exact path={path} component={Resources} />
      <Route exact path={`${path}/addProgram`} component={AddEdit} />
      <Route exact path={`${path}/allProgram`} component={List} />
      <Route path={`${path}/edit/:id/:programName`} component={EditProgram} />
      <Route path={`${path}/uploadData`} component={UploadProgramData} />
      {/* 
            <Route path={`${path}/uploadPrequisites`} component={UploadPrequisites} />
            <Route path={`${path}/getAllByRole`} component={GetTrainingByRole} />
            <Route path={`${path}/getAll`} component={Trainings} />
            <Route path={`${path}/getAllNominations`} component={AllNominations} />
            <Route path={`${path}/editList`} component={EditTrainingList} />
            <Route path={`${path}/edit/:id`} component={EditTraining} />
            <Route path={`${path}/assign/:id`} component={AssignUsers} />
            <Route path={`${path}/uploadList`} component={UploadFieldList} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  );
}

export { Revenue };
