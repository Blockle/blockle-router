import { History } from 'history';

export type Unregister = () => void;
export type RouteComponent = any;
export type Match = Params | false;

export interface Params {
  [key: string]: string;
}

export interface IRouterContext {
  history: History;
  parentPath: string;
  register: (route: any) => Unregister;
}
