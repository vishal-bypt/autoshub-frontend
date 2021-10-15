import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import  AddEdit  from './AddEdit';
import { MyEntries } from './MyEntries';
import { EditedEntries } from './EditedEntries';
import { LandingEntries } from './LandingEntries';

function RFPForm({ match }) {
    const { path } = match;    
    return (
        <Switch>
            <Route exact path={path} component={LandingEntries} />
            <Route exact path={`${path}/all-entries`} component={List} />
            <Route exact path={`${path}/my-entries`} component={MyEntries} />
            <Route exact path={`${path}/edited-entries`} component={EditedEntries} />
            <Route exact path={`${path}/landing-entries`} component={LandingEntries} />
            <Route exact path={`${path}/add`} component={AddEdit} />
            <Route exact path={`${path}/edit/:id`} component={AddEdit} />
        </Switch>
    );
}

export { RFPForm };