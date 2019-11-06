import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Params } from './types';
import { RouteGroupContext, RouterContext } from './context';
import { createMatcher } from './createMatcher';

interface RouteProps {
  render?(match: boolean, params: Params): React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  noMatch?: boolean;
  exclude?: boolean;
  children?: React.ReactNode;
}

const Route = ({
  children,
  noMatch = false,
  path = '',
  exact = false,
  render,
}: RouteProps) => {
  const { history } = useContext(RouterContext);
  const paths = Array.isArray(path) ? path : [path];
  const matcher = useMemo(() => createMatcher(paths, exact), paths);
  // Register to group
  const context = useContext(RouteGroupContext);
  const [match, setMatch] = useState<null | Params>(
    matcher(history.location.pathname),
  );

  useEffect(() => {
    return context.register({
      matcher,
      setMatch,
      noMatch,
    });
  }, paths);

  if (render) {
    return render(!!match, match || {}) as JSX.Element;
  }

  if (match) {
    return <>{children}</>;
  }

  return null;
};

export default Route;
