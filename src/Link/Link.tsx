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
  renderAs: string | React.ReactElement<any>;
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

    if (
      !event.defaultPrevented &&
      event.button === 0 &&
      !isModifiedEvent(event)
    ) {
      event.preventDefault();

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  renderLink = (match: boolean) => {
    const { activeClassName, className, children, renderAs, to } = this.props;
    const props = {
      'data-href': to,
      onClick: this.clickHandler,
      className: `${className} ${match ? activeClassName : ''}`,
    };

    if (typeof renderAs !== 'string') {
      return React.cloneElement(renderAs, props, children);
    }

    return React.createElement(renderAs, props, children);
  };

  render() {
    const { to, exact } = this.props;

    return <Route path={to} exact={exact} render={this.renderLink} exclude />;
  }
}
