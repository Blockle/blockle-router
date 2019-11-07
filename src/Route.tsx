import React, { useContext, useEffect, useState, useMemo } from 'react';
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

const Route = ({
  children,
  noMatch = false,
  path = '',
  exact = false,
  render,
}: RouteProps) => {
  const { history } = useContext(RouterContext);
  const parentUrl = useContext(RouteGroupContext).baseUrl;
  const paths = Array.isArray(path) ? path : [path];
  // Prepend parentUrl and format route string.
  const fullPaths = paths.map(path =>
    (parentUrl + '/' + path).replace(/\/+/g, '/').replace(/\/$/, ''),
  );
  const matcher = useMemo(() => createMatcher(fullPaths, exact), paths);
  // Register to group
  const context = useContext(RouteGroupContext);
  const [match, setMatch] = useState<null | Params>(
    noMatch ? null : matcher(history.location.pathname),
  );

  useEffect(() => {
    return context.register({
      matcher,
      setMatch,
      noMatch,
    });
  }, paths);

  return (
    <RouteGroup baseUrl={fullPaths[0]}>
      {renderRoute({ render, match, children })}
    </RouteGroup>
  );
};

export default Route;
