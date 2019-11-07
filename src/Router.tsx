import React from 'react';
import RouteGroup from './RouteGroup';
import { History } from 'history';
import { RouterContext } from './context';

interface RouterProps {
  children: React.ReactNode;
  history: History;
}

const Router = ({ children, history }: RouterProps) => {
  const context = { history };

  return (
    <RouterContext.Provider value={context}>
      <RouteGroup baseUrl="/">{children}</RouteGroup>
    </RouterContext.Provider>
  );
};

export default Router;
