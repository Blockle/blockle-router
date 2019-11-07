import React from 'react';
import {
  RouteGroupContext as IRouteGroupContext,
  RouterContext as IRouterContext,
} from './types';

export const RouteGroupContext = React.createContext<IRouteGroupContext>({
  baseUrl: '/',
  register: () => () => {},
});

export const RouterContext = React.createContext<IRouterContext>({
  history: null as any,
});
