import 'jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-testing-library';

import Router from './Router';

describe('Router', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Router>
        Children
      </Router>,
    );

    expect(getByText('Children')).toBeTruthy();
  });
});
