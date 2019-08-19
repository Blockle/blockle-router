import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';

import { RouterContext } from '../context';
import { Unregister, Match, Params, IRouterContext } from '../types';

interface Props {
  /**
   * Render will always be called with matching boolean and route params
   */
  render?(match: boolean, params: Params): React.ReactNode;
  /**
   * Path expression see https://github.com/pillarjs/path-to-regexp
   */
  path?: string | string[];
  /**
   * Path must be an exact match
   */
  exact?: boolean;
  /**
   * Render when no routes are matched "404"
   */
  noMatch?: boolean;
  /**
   * Exclude required if this route should not affect 404 matching
   * Usefull for creating Link like component
   */
  exclude?: boolean;
}

interface State {
  match: false | Params;
}

export default class Route extends Component<Props, State> {
  static contextType = RouterContext;

  context!: IRouterContext;
  keys: pathToRegexp.Key[] = [];
  matchers: RegExp[] = [];
  unregister!: Unregister;

  state = {
    match: false as false,
  };

  componentDidMount() {
    this.unregister = this.context.register(this);
  }

  componentWillUnmount() {
    this.unregister();
  }

  createPath(path: string) {
    const { parentPath } = this.context;

    if (!path) {
      return parentPath;
    }

    return (parentPath + path).replace(/\/\/|\/$/g, '/').replace(/\/+$/, '');
  }

  getParentPath() {
    const { path } = this.props;

    return this.createPath(Array.isArray(path) ? path[0] : path || '');
  }

  getMatchers() {
    const { path } = this.props;

    if (!path) {
      throw new Error('Route :: No path set');
    }

    const paths = typeof path === 'string' ? [path] : path;

    if (!this.matchers.length) {
      this.matchers = paths.map(path =>
        pathToRegexp(this.createPath(path), this.keys, { end: false }),
      );
    }

    return this.matchers;
  }

  match(path: string) {
    // Exclude 404 from match
    if (this.props.noMatch) {
      return false;
    }

    const matchers = this.getMatchers();

    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < matchers.length; i++) {
      const match = matchers[i].exec(path);

      if (!match) {
        continue;
      }

      const [matchPath, ...values] = match;
      const params: Params = {};

      if (this.props.exact && path !== matchPath) {
        continue;
      }

      this.keys.forEach((key, index) => {
        params[key.name] = values[index];
      });

      return params;
    }

    return false;
  }

  update(match: Match) {
    this.setState({ match });
  }

  renderChildren() {
    const { children, render } = this.props;
    const { match } = this.state;

    if (render) {
      return render(!!match, match || {});
    }

    if (match) {
      return children;
    }

    return null;
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          ...this.context,
          parentPath: this.getParentPath(),
        }}
      >
        {this.renderChildren()}
      </RouterContext.Provider>
    );
  }
}
