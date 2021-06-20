import '@testing-library/jest-dom/extend-expect';
import { act, cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Link } from './Link';
import { Route } from './Route';
import { Router } from './Router';

let history = createMemoryHistory();

beforeEach(() => {
  history = createMemoryHistory();
});

afterEach(cleanup);

describe('Route', () => {
  it('should render matching route', () => {
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

    expect(getByText('HOME')).toBeTruthy();
    expect(() => getByText('ABOUT')).toThrow();
  });

  it('should render non matching route if no routes match', () => {
    const { getByText } = render(
      <Router history={history}>
        <Route path="/foo">FOO</Route>
        <Route path="/bar">BAR</Route>
        <Route noMatch>NO MATCH</Route>
      </Router>,
    );

    expect(() => getByText('FOO')).toThrow();
    expect(() => getByText('BAR')).toThrow();
    expect(getByText('NO MATCH')).toBeTruthy();
  });

  it('should render non matching on route change', () => {
    const { getByText } = render(
      <Router history={history}>
        <Route path="/" exact>
          FOO
        </Route>
        <Route path="/bar">BAR</Route>
        <Route noMatch>NO MATCH</Route>
      </Router>,
    );

    act(() => {
      history.push('/help');
    });

    expect(() => getByText('FOO')).toThrow();
    expect(() => getByText('BAR')).toThrow();
    expect(getByText('NO MATCH')).toBeTruthy();
  });

  it('should render nested routes', () => {
    history.push('/foo/bar/baz');

    const { getByText } = render(
      <Router history={history}>
        <Route path="/foo">
          <span>FOO</span>
          <Route path="/bar">
            <span>BAR</span>
            <Route path="/baz">
              <span>BAZ</span>
            </Route>
          </Route>
        </Route>
      </Router>,
    );

    expect(getByText('BAZ')).toBeTruthy();
  });

  it('should render on exact match', () => {
    history.push('/foo');

    const { getByText } = render(
      <Router history={history}>
        <Route path="/" exact>
          HOME
        </Route>
        <Route path="/foo" exact>
          EXACT
        </Route>
      </Router>,
    );

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

  it('should always render with correct params', () => {
    const { getByText } = render(
      <Router history={history}>
        <Route
          path="/foo/:bar/:baz"
          render={
            // tslint:disable-next-line
            (match, params) =>
              match && (
                <span>
                  {params.bar} - {params.baz}
                </span>
              )
          }
        />
      </Router>,
    );

    act(() => {
      history.push('/foo/bar-value/baz-value');
    });

    expect(getByText('bar-value - baz-value')).toBeTruthy();
  });

  it('should exclude links from matches', () => {
    const { getByText } = render(
      <Router history={history}>
        <Link to="/">Link</Link>
        <Route path="/foo">FOO</Route>
        <Route path="/bar">BAR</Route>
        <Route noMatch>NO MATCH</Route>
      </Router>,
    );

    expect(() => getByText('FOO')).toThrow();
    expect(() => getByText('BAR')).toThrow();
    expect(getByText('NO MATCH')).toBeTruthy();
  });
});
