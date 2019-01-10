import React, { Component } from 'react';

import Route from '../Route';

interface Props {
  path?: string;
  exact?: boolean;
  noMatch?: boolean;
}

export default class Link extends Component<Props> {
  renderLink = () => {
    const { children } = this.props;

    return children;
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
