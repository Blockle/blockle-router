import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Router from './Router';
import { createMemoryHistory } from 'history';

let history = createMemoryHistory();

afterEach(() => {
  history = createMemoryHistory();
  afterEach(cleanup);
});

describe('Router', () => {
  it('should render children', () => {
    const { getByText } = render(<Router history={history}>Children</Router>);

    expect(getByText('Children')).toBeTruthy();
  });
});
