import React, { FC, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { RouteGroupContext } from '../context/RouteGroupContext';
import { useHistory } from '../hooks/useHistory';
import { Params } from '../types';
import { cleanupPath } from '../utils/cleanupPath';
import { createPathsMatcher } from '../utils/createPathMatcher';
import { RenderComponent, renderRoute } from '../utils/renderRoute';
import { RouteGroup } from './RouteGroup';

interface Props {
  children?: React.ReactNode;
  exact?: boolean;
  noMatch?: boolean;
  path?: string | string[];
  render?: RenderComponent;
}

export const Route: FC<Props> = ({ children, exact = false, noMatch = false, path, render }) => {
  const history = useHistory();
  const parentContext = useContext(RouteGroupContext);
  const paths = Array.isArray(path) ? path : [path];
  const fullPaths = paths.map((path) => cleanupPath(parentContext.baseUrl + '/' + (path || '')));
  const getMatch = useMemo(() => createPathsMatcher(fullPaths, exact), paths);
  const initialMatch = useMemo(() => getMatch(history.location.pathname), []);
  const [match, setMatch] = useState<null | Params>(initialMatch);

  useLayoutEffect(() => {
    return parentContext.register({
      getMatch,
      setMatch,
      noMatch,
    });
  }, paths);

  return <RouteGroup baseUrl={fullPaths[0]}>{renderRoute({ children, match, render })}</RouteGroup>;
};
