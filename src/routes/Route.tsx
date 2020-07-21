import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import ChooseServer from '../pages/ChooseServer';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isSelectedGuild?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isSelectedGuild = false,
  component: Component,
  ...rest
}) => {
  const { user, selectedGuild } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!user) {
          if (isSelectedGuild === !!selectedGuild) {
            return <Component />;
          }
          return <ChooseServer />;
        }
        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/servers',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
