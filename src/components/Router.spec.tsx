import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from './Router';

let history = createMemoryHistory();

beforeEach(() => {
  history = createMemoryHistory();
});

afterEach(cleanup);

describe('Router', () => {
  it('should render children', () => {
    const { getByText } = render(<Router history={history}>Children</Router>);

    expect(getByText('Children')).toBeTruthy();
  });
});
