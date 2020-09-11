import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import NotFound from '../pages/NotFound';

import ChooseServer from '../pages/ChooseServer';
import Dashboard from '../pages/Dashboard';

import CustomCommands from '../pages/CustomCommands/List';
import NewCustomCommands from '../pages/CustomCommands/New';

import ListCategories from '../pages/Category/List';
import NewCategory from '../pages/Category/New';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/servers" exact component={ChooseServer} isPrivate />
    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="/custom-commands" exact component={CustomCommands} isPrivate />
    <Route
      path="/custom-commands/new"
      exact
      component={NewCustomCommands}
      isPrivate
    />
    <Route
      path="/custom-commands/edit"
      exact
      component={NewCustomCommands}
      isPrivate
    />

    <Route path="/categories" exact component={ListCategories} isPrivate />
    <Route path="/categories/new" exact component={NewCategory} isPrivate />
    <Route path="/categories/edit" exact component={NewCategory} isPrivate />

    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
