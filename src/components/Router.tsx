import { History } from 'history';
import React, { FC, ReactNode } from 'react';
import { RouterContext } from '../context/RouterContext';
import { RouteGroup } from './RouteGroup';

export interface RouterProps {
  baseUrl?: string;
  children: ReactNode;
  history: History;
}

export const Router: FC<RouterProps> = ({ children, history, baseUrl = '/' }) => {
  return (
    <RouterContext.Provider value={{ history }}>
      <RouteGroup baseUrl={baseUrl}>{children}</RouteGroup>
    </RouterContext.Provider>
  );
};
