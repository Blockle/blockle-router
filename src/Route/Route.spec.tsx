import 'jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-testing-library';

import Route from './Route';
import Router from '../Router';

describe('Route', () => {
  it('should render matching route', () => {
    const { getByText } = render(
      <Router>
        <Route path="/">
          <h1>HOME</h1>
        </Route>
        <Route path="/about">
          <h1>ABOUT</h1>
        </Route>
      </Router>,
    );

    expect(getByText('HOME')).toBeTruthy();
    expect(() => getByText('ABOUT')).toThrow();
  });

  it('should always render the render prop', () => {
    const { getByText } = render(
      <Router>
        <Route
          render={
            // tslint:disable-next-line
            () => <span>TEST</span>
          }
        />
      </Router>,
    );

    expect(getByText('TEST')).toBeTruthy();
  });
});
