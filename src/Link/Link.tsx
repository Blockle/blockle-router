import React, { Component } from 'react';

import Route from '../Route';
import { RouterContext } from '../context';
import { IRouterContext } from '../types';

interface Props {
  activeClassName: string;
  className: string;
  exact?: boolean;
  noMatch?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  path?: string;
  renderAs: string;
  replace?: boolean;
  to: string;
}

const isModifiedEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class Link extends Component<Props> {
  static contextType = RouterContext;

  static defaultProps = {
    activeClassName: 'is-active',
    className: 'Link',
    renderAs: 'a',
  };

  context!: IRouterContext;

  clickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { onClick, replace, to } = this.props;
    const { history } = this.context;

    if (onClick) {
      event.preventDefault();

      return onClick(event);
    }

    if (!event.defaultPrevented && event.button === 0 && !isModifiedEvent(event)) {
      event.preventDefault();

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  }

  renderLink = (match: boolean) => {
    const { activeClassName, className, children, renderAs, to } = this.props;

    return React.createElement(
      renderAs,
      {
        [renderAs === 'a' ? 'href' : 'data-href']: to,
        onClick: this.clickHandler,
        className: `${className} ${match ? activeClassName : ''}`,
      },
      children,
    );
  }

  render() {
    const { path, exact, noMatch } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        noMatch={noMatch}
        render={this.renderLink}
        exclude
      />
    );
  }
}
