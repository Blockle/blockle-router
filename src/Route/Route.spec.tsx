import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Route from './Route';
import Router from '../Router';

const wait = (timeout = 50) => new Promise(resolve => setTimeout(resolve, timeout));
let history = createMemoryHistory();

afterEach(() => {
  history = createMemoryHistory();
  afterEach(cleanup);
});

describe('Route', () => {
  it('should render matching route', async () => {
    const { getByText } = render(
      <Router history={history}>
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

  it('should render non matching route if no routes match', async () => {
    const { getByText } = render(
      <Router history={history}>
        <Route path="/foo">FOO</Route>
        <Route path="/bar">BAR</Route>
        <Route noMatch>NO MATCH</Route>
      </Router>,
    );

    await wait();

    expect(() => getByText('FOO')).toThrow();
    expect(() => getByText('BAR')).toThrow();
    expect(getByText('NO MATCH')).toBeTruthy();
  });

  it('should render nested routes', async () => {
    history.push('/foo/bar/baz');

    const { getByText } = render(
      <Router history={history}>
        <Route path="/foo">
          <Route path="/bar">
            <Route path="/baz">BAZ</Route>
          </Route>
        </Route>
      </Router>,
    );

    await waitForElement(() => getByText('BAZ'));

    expect(getByText('BAZ')).toBeTruthy();
  });

  it('should only render on exact match', async () => {
    history.push('/foo');

    const { getByText } = render(
      <Router history={history}>
        <Route path="/" exact>HOME</Route>
        <Route path="/foo" exact>EXACT</Route>
      </Router>,
    );

    await wait();

    expect(() => getByText('HOME')).toThrow();
    expect(getByText('EXACT')).toBeTruthy();
  });

  it('should always render the render prop', () => {
    const { getByText } = render(
      <Router history={history}>
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

  it('should always render the render prop', async () => {
    history.push('/foo/bar-value/baz-value');

    const { getByText } = render(
      <Router history={history}>
        <Route
          path="/foo/:bar/:baz"
          render={
            // tslint:disable-next-line
            (match, params) => (
              match && <span>{params.bar} - {params.baz}</span>
            )
          }
        />
      </Router>,
    );

    await wait();

    expect(getByText('bar-value - baz-value')).toBeTruthy();
  });
});
