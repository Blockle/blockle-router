import { History } from 'history';
import React, { FC } from 'react';
import { RouterContext } from '../context/RouterContext';
import { RouteGroup } from './RouteGroup';

interface Props {
  children: React.ReactNode;
  history: History;
  baseUrl?: string;
}

export const Router: FC<Props> = ({ children, history, baseUrl = '/' }) => {
  return (
    <RouterContext.Provider value={{ history }}>
      <RouteGroup baseUrl={baseUrl}>{children}</RouteGroup>
    </RouterContext.Provider>
  );
};
