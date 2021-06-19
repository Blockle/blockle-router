import { History } from 'history';
import React, { FC } from 'react';
import { RouterContext } from '../context/RouterContext';
import { RouteGroup } from './RouteGroup';

export interface RouterProps {
  history: History;
  baseUrl?: string;
}

export const Router: FC<RouterProps> = ({ children, history, baseUrl = '/' }) => {
  return (
    <RouterContext.Provider value={{ history }}>
      <RouteGroup baseUrl={baseUrl}>{children}</RouteGroup>
    </RouterContext.Provider>
  );
};
