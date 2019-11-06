import { useContext } from 'react';

import { RouterContext } from './context';

export function useHistory() {
  return useContext(RouterContext).history;
}
