import 'jest-dom/extend-expect';
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import Route from './Route';
import Router from '../Router';

describe('Route', () => {
  it('should render matching route', async () => {
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
        <Route path="/">
          <h1>HOME</h1>
        </Route>
        <Route path="/about">
          <h1>ABOUT</h1>
        </Route>
      </Router>,
    );

    await waitForElement(() => getByText('HOME'));

    expect(getByText('HOME')).toBeTruthy();
    expect(() => getByText('ABOUT')).toThrow();
  });

  it('should always render the render prop', () => {
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
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
