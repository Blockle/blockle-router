import { useContext } from 'react';

import { RouterContext } from './context';

export function useHistory() {
  const context = useContext(RouterContext);

  console.log(context);

  return context.history;
}
