import { createContext } from 'react';
import { ContextStore, createContextStore } from '../contextStore';
import { Params } from '../types';
import { Matcher } from '../utils/createPathsMatcher';

export interface RouteGroupContextEntryType {
  exclude: boolean;
  matcher: Matcher;
  noMatch: boolean;
  paths: string[];
  updateMatch: (match: null | Params) => void;
}

export interface RouteGroupContextType {
  baseUrl: string;
  routes: RouteGroupContextEntryType[];
}

export const RouteGroupContext = createContext<ContextStore<RouteGroupContextType>>(
  createContextStore({ baseUrl: '/', routes: [] }),
);
