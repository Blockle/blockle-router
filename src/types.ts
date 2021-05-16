export type Params = Record<string, string>;

export interface RouteRef {
  getMatch: (pathname: string) => null | Params;
  noMatch: boolean;
  setMatch: (match: null | Params) => void;
  exclude?: boolean;
}
