import { createContext } from 'react';
import { RouteRef } from '../types';

export interface RouteGroupContextType {
  baseUrl: string;
  register: (route: RouteRef) => () => void;
}

export const RouteGroupContext = createContext<RouteGroupContextType>({
  baseUrl: '/',
  register: () => () => {},
});
