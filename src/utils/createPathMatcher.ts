import { Key, pathToRegexp } from 'path-to-regexp';
import { Params } from '../types';

type Matcher = (route: string) => Params | null;

export function createPathsMatcher(paths: string[], exact: boolean): Matcher {
  const matchers = paths.map((path) => {
    const keys: Key[] = [];

    return {
      path: pathToRegexp(path, keys, { end: exact }),
      keys,
    };
  });

  return (route: string) => {
    const matches = matchers
      .map((matcher) => {
        const match = matcher.path.exec(route);
        const params: Params = {};

        if (!match) {
          return false;
        }

        matcher.keys.forEach((key, index) => {
          params[key.name] = match[index + 1];
        });

        return params;
      })
      .filter(Boolean);

    if (!matches.length) {
      return null;
    }

    return matches[0] || null;
  };
}
