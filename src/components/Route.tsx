import React, { FC, useContext, useLayoutEffect, useState } from 'react';
import { Route as RouteEntry, RouteGroupContext } from '../context/RouteGroupContext';
import { Params } from '../types';
import { cleanupPath } from '../utils/cleanupPath';
import { createPathsMatcher } from '../utils/createPathsMatcher';
import { RenderComponent, renderRoute } from '../utils/renderRoute';
import { RouteGroup } from './RouteGroup';

export interface RouteProps {
  exact?: boolean;
  noMatch?: boolean;
  path?: string | string[];
  render?: RenderComponent;
  debugId?: string;
}

export const Route: FC<RouteProps> = ({
  children,
  path,
  exact = false,
  noMatch = false, // Is "404"
  render,
  debugId,
}) => {
  const routeGroup = useContext(RouteGroupContext);
  const { baseUrl } = routeGroup.getState();
  const paths = !path ? [] : Array.isArray(path) ? path : [path];
  const [match, setMatch] = useState<null | Params>(null);

  useLayoutEffect(() => {
    const state = routeGroup.getState();
    const fullPaths = paths.map((path) => cleanupPath(baseUrl + '/' + (path || '')));
    const routeEntry: RouteEntry = {
      exclude: false,
      noMatch,
      paths: fullPaths,
      updateMatch: setMatch,
      matcher: createPathsMatcher(fullPaths, exact),
      debugId,
    };

    routeGroup.setState({
      ...state,
      routes: [...state.routes, routeEntry],
    });

    return () => {
      const state = routeGroup.getState();

      routeGroup.setState({
        ...state,
        routes: state.routes.filter((route) => route !== routeEntry),
      });
    };
  }, [...paths]);

  return <RouteGroup baseUrl={paths[0]}>{renderRoute({ children, match, render })}</RouteGroup>;
};
