import { createContext } from 'react';
import { ContextStore, createContextStore } from '../contextStore';
import { Params } from '../types';
import { Matcher } from '../utils/createPathsMatcher';

export interface Route {
  exclude: boolean;
  matcher: Matcher;
  noMatch: boolean;
  paths: string[];
  updateMatch: (match: null | Params) => void;
}

export interface RouteGroup {
  baseUrl: string;
  routes: Route[];
}

export const RouteGroupContext = createContext<ContextStore<RouteGroup>>(
  createContextStore({ baseUrl: '/', routes: [] }),
);
