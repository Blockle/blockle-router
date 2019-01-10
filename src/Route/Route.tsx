import React, { Component } from 'react';

interface Props {
  /**
   * Render will always be called with matching boolean and route params
   */
  render?(match: boolean, params: any): React.ReactNode;
  /**
   * Path expression see https://github.com/pillarjs/path-to-regexp
   */
  path?: string;
  /**
   * Path must be an exact match
   */
  exact?: boolean;
  /**
   * Render when no routes are matched
   */
  noMatch?: boolean;
  /**
   * Exclude required if this route should not affect 404 matching
   * Usefull for creating Link like component
   */
  exclude?: boolean;
}

export default class Route extends Component<Props> {
  render() {
    const { children, render } = this.props;

    if (render) {
      return render(true, {});
    }

    return children;
  }
}
