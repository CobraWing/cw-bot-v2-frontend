import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';

import ChooseServer from '../pages/ChooseServer';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/servers" exact component={ChooseServer} isPrivate />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
