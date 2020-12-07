import { History } from 'history';
import React from 'react';
import { RouterContext } from './context';
import RouteGroup from './RouteGroup';

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
