import React, { Component } from 'react';
import { History, UnregisterCallback } from 'history';

import { RouterContext } from '../context';
import { RouteComponent } from 'types';

interface Props {
  history: History;
}

interface RouteGroups {
  [key: string]: RouteComponent[];
}

export default class Router extends Component<Props> {
  routeGroups: RouteGroups = {};
  unlisten!: UnregisterCallback;
  raf!: number;

  componentDidMount() {
    this.unlisten = this.unlisten = this.props.history.listen(this.update);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  registerRoute = (route: RouteComponent) => {
    const { parentPath } = route.context;

    if (!this.routeGroups[parentPath]) {
      this.routeGroups[parentPath] = [];
    }

    const group = this.routeGroups[parentPath];

    group.push(route);

    this.requestUpdate();

    return () => {
      group.splice(group.indexOf(route), 1);
      this.requestUpdate();
    };
  };

  requestUpdate = () => {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.update);
  };

  update = () => {
    const { pathname } = this.props.history.location;
    const groups = Object.values(this.routeGroups);

    groups.forEach(group => this.updateRouteGroup(pathname, group));
  };

  updateRouteGroup(path: string, group: RouteComponent[]) {
    const nonMatchingRoutes: RouteComponent[] = [];
    let matchFound = false;

    group.forEach(route => {
      const match = route.match(path);

      // Update 404 elements later on
      if (route.props.noMatch) {
        nonMatchingRoutes.push(route);
      } else {
        route.update(match);
      }

      if (match && !route.props.exclude) {
        matchFound = true;
      }
    });

    nonMatchingRoutes.forEach(route => route.update(matchFound ? false : {}));
  }

  render() {
    const { children } = this.props;

    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          parentPath: '',
          register: this.registerRoute,
        }}
      >
        {children}
      </RouterContext.Provider>
    );
  }
}
