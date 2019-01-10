import 'jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-testing-library';

import Router from './Router';
import { createMemoryHistory } from 'history';

describe('Router', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
        Children
      </Router>,
    );

    expect(getByText('Children')).toBeTruthy();
  });
});
