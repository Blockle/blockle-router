import { History } from 'history';

export interface RouterContext {
  history: History;
}

export interface RouteGroupContext {
  baseUrl: string;
  register: (route: RouteRef) => () => void;
}

export type Params = Record<string, string>;

export interface RouteRef {
  matcher: (pathname: string) => null | Params;
  setMatch: (match: null | Params) => void;
  noMatch: boolean;
}
