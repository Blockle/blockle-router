import { useContext } from 'react';

import { RouterContext } from './context';

export function useHistory() {
  const context = useContext(RouterContext);

  return context.history;
}
