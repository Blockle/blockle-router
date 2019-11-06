import React, { useContext, useEffect, useState } from 'react';
import { Params } from './types';
import { RouteGroupContext } from './context';
import pathToRegexp, { Key } from 'path-to-regexp';

interface RouteProps {
  render?(match: boolean, params: Params): React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  noMatch?: boolean;
  exclude?: boolean;
  children: React.ReactNode;
}

function mapPathsToRegex(paths: string | string[], exact = false) {
  let forcedArray = typeof paths === 'string' ? [paths] : paths;

  // TODO keys
  const keys: Key[] = [];

  const nextPaths = forcedArray.map(path =>
    pathToRegexp(path, keys, { end: exact }),
  );

  // console.log('k', keys, nextPaths);

  return nextPaths;
}

const Route = ({
  children,
  noMatch = false,
  path,
  exact = false,
  render,
}: RouteProps) => {
  // Register to group
  const context = useContext(RouteGroupContext);
  const [match, setMatch] = useState(false); // TODO Check to render here? For first render

  useEffect(() => {
    if (!path) {
      return;
    }

    const paths = mapPathsToRegex(path, exact);

    return context.register({
      paths,
      setMatch,
      noMatch,
    });
  }, [path]);

  if (render) {
    return render(!!match, {});
  }

  if (match) {
    return <>{children}</>;
  }

  return null;
};

export default Route;
