import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { AddEdit } from './AddEdit';
import { EditTraining } from './EditTraining';
import { AssignUsers } from './AssignUsers';
import { UploadPrequisites } from './UploadPrequisites';
import { UploadFieldList } from './UploadFieldList';
import { EditTrainingList } from "./EditTrainingList";
import {GetTrainingByRole} from "./GetTrainingByRole";
import { AllNominations } from "./AllNominations";
import { Trainings } from "./Trainings";

function Training({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/add`} component={AddEdit} />
            <Route path={`${path}/uploadPrequisites`} component={UploadPrequisites} />
            <Route path={`${path}/getAllByRole`} component={GetTrainingByRole} />
            <Route path={`${path}/getAll`} component={Trainings} />
            <Route path={`${path}/getAllNominations`} component={AllNominations} />
            <Route path={`${path}/editList`} component={EditTrainingList} />
            <Route path={`${path}/edit/:id`} component={EditTraining} />
            <Route path={`${path}/assign/:id`} component={AssignUsers} />
            <Route path={`${path}/uploadList`} component={UploadFieldList} />
            
        </Switch>
    );
}

export { Training };