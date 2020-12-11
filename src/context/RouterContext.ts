import { History } from 'history';
import { createContext } from 'react';

export interface RouterContextType {
  history: History;
}

export const RouterContext = createContext<RouterContextType>({
  history: undefined as any,
});
