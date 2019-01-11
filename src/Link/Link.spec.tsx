import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import Link from './Link';
import Router from '../Router';

let history = createMemoryHistory();

afterEach(() => {
  history = createMemoryHistory();
  afterEach(cleanup);
});

const wait = (timeout = 50) => new Promise(resolve => setTimeout(resolve, timeout));

describe('Link', () => {
  it('should always render Link', () => {
    const { getByText } = render(
      <Router history={history}>
        <Link to="/">
          Link
        </Link>
      </Router>,
    );

    expect(getByText('Link')).toBeTruthy();
  });

  it('should append active class when link matches current route', async () => {
    history.push('/test-route');

    const { getByText } = render(
      <Router history={history}>
        <Link to="/test-route">
          Link
        </Link>
      </Router>,
    );

    await wait();

    expect(getByText('Link')).toHaveClass('is-active');
  });

  it('should change location when Link got clicked', (done) => {
    const { getByText } = render(
      <Router history={history}>
        <Link to="/test-route">
          Test Route
        </Link>
      </Router>,
    );

    history.listen((location) => {
      expect(location.pathname).toBe('/test-route');
      done();
    });

    fireEvent.click(getByText('Test Route'));
  });

  it('should call history replace api when replace prop is set', () => {
    const historySpy = jest.spyOn(history, 'replace');
    const { getByText } = render(
      <Router history={history}>
        <Link to="/foo" replace>
          Link
        </Link>
      </Router>,
    );

    fireEvent.click(getByText('Link'));

    expect(historySpy).toBeCalled();
  });

  it('should trigger onClick when clicked', () => {
    const spy = jest.fn();
    const historySpy = jest.spyOn(history, 'push');
    const { getByText } = render(
      <Router history={history}>
        <Link to="/foo" onClick={spy}>
          Link
        </Link>
      </Router>,
    );

    fireEvent.click(getByText('Link'));

    expect(spy).toBeCalled();
    expect(historySpy).not.toBeCalled();
  });
});
