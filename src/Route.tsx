import React, { useContext, useState, useMemo, useLayoutEffect } from 'react';
import { Params } from './types';
import { RouteGroupContext, RouterContext } from './context';
import { createMatcher } from './createMatcher';
import RouteGroup from './RouteGroup';

interface RouteProps {
  render?(match: boolean, params: Params): React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  noMatch?: boolean;
  exclude?: boolean;
  children?: React.ReactNode;
}

const renderRoute = ({ render, children, match }: any) => {
  if (render) {
    return render(!!match, match || {}) as JSX.Element;
  }

  if (match) {
    return <>{children}</>;
  }

  return null;
};

const createPath = (parentPath: string) => (path: string) =>
  (parentPath + '/' + path).replace(/\/+/g, '/').replace(/\/$/, '');

const Route = ({ children, noMatch = false, path = '', exact = false, render }: RouteProps) => {
  const { history } = useContext(RouterContext);
  const parentUrl = useContext(RouteGroupContext).baseUrl;
  const paths = Array.isArray(path) ? path : [path];
  // Prepend parentUrl to given paths
  const fullPaths = paths.map(createPath(parentUrl));
  const initialMatch = useMemo(
    () => (noMatch ? null : createMatcher(fullPaths, exact)(history.location.pathname)),
    [],
  );
  const context = useContext(RouteGroupContext);
  const [match, setMatch] = useState<null | Params>(initialMatch);

  useLayoutEffect(() => {
    const matcher = createMatcher(fullPaths, exact);

    return context.register({
      matcher,
      setMatch,
      noMatch,
    });
  }, paths);

  return <RouteGroup baseUrl={fullPaths[0]}>{renderRoute({ render, match, children })}</RouteGroup>;
};

export default Route;
