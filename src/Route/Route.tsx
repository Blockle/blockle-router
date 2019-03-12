import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';

import { RouterContext } from '../context';
import { Unregister, Match, Params, IRouterContext } from '../types';
import { useRoute } from 'hooks';

interface Props {
  /**
   * Render will always be called with matching boolean and route params
   */
  render?: (match: boolean, params: Params) => React.ReactNode;
  /**
   * Path expression see https://github.com/pillarjs/path-to-regexp
   */
  path?: string;
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
  children?: React.ReactNode;
}

interface State {
  match: false | Params;
}

const Route = ({ children, render }: Props) => {
  const { match, params } = useRoute('/foo/:bar');

  console.log(match, params);

  if (render) {
    return render(match, params) as JSX.Element;
  }

  if (match) {
    // return (<RouterContext.Provider values={{ ...context, path }}>{children}</RouterContext.Provider>);

    return children as JSX.Element;
  }

  return null;
};

export default Route;

export class Routez extends Component<Props, State> {
  static contextType = RouterContext;

  context!: IRouterContext;
  keys: pathToRegexp.Key[] = [];
  matcher = pathToRegexp(this.path(), this.keys, { end: false });
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

  path() {
    const { parentPath } = this.context;
    const { path } = this.props;

    if (!path) {
      return parentPath;
    }

    return (parentPath + path)
      .replace(/\/\/|\/$/g, '/')
      .replace(/\/+$/, '');
  }

  match(path: string) {
    // Exclude 404 from match
    if (this.props.noMatch) {
      return false;
    }

    const match = this.matcher.exec(path);

    if (!match) {
      return false;
    }

    const [matchPath, ...values] = match;

    if (this.props.exact && path !== matchPath) {
      return false;
    }

    const params: Params = {};

    this.keys.forEach((key, index) => {
      params[key.name] = values[index];
    });

    return params;
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
          parentPath: this.path(),
        }}
      >
        {this.renderChildren()}
      </RouterContext.Provider>
    );
  }
}
