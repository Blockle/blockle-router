import 'jest-dom/extend-expect';
import React from 'react';
import { render } from 'react-testing-library';
import { createMemoryHistory } from 'history';

import Link from './Link';
import Router from '../Router';

describe('Link', () => {
  it('should render matching route', () => {
    const { getByText } = render(
      <Router history={createMemoryHistory()}>
        <Link to="/">
          Link
        </Link>
      </Router>,
    );

    expect(getByText('Link')).toBeTruthy();
  });
});
