import React, { FC, ReactNode, useContext, useLayoutEffect, useState } from 'react';
import { RouteGroupContext, RouteGroupContextEntryType } from '../context/RouteGroupContext';
import { Params } from '../types';
import { cleanPath } from '../utils/cleanPath';
import { createPathsMatcher } from '../utils/createPathsMatcher';
import { RenderComponent, renderRoute } from '../utils/renderRoute';
import { RouteGroup } from './RouteGroup';

export interface RouteProps {
  children?: ReactNode;
  exact?: boolean;
  exclude?: boolean;
  noMatch?: boolean;
  path?: string | string[];
  render?: RenderComponent;
}

export const Route: FC<RouteProps> = ({
  children,
  exact = false,
  exclude = false,
  noMatch = false, // Is "404"
  path,
  render,
}) => {
  const routeGroup = useContext(RouteGroupContext);
  const [match, setMatch] = useState<null | Params>(null);
  const { baseUrl } = routeGroup.getState();
  const paths = !path ? [] : Array.isArray(path) ? path : [path];
  const fullPaths = paths.map((path) => cleanPath(baseUrl + '/' + (path || '')));

  useLayoutEffect(() => {
    const state = routeGroup.getState();
    const routeEntry: RouteGroupContextEntryType = {
      exclude,
      matcher: createPathsMatcher(fullPaths, exact),
      noMatch,
      paths: fullPaths,
      updateMatch: setMatch,
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

  return <RouteGroup baseUrl={fullPaths[0]}>{renderRoute({ children, match, render })}</RouteGroup>;
};
