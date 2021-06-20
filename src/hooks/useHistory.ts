import { useContext } from 'react';
import { RouterContext } from '../context/RouterContext';

export function useHistory() {
  return useContext(RouterContext).history;
}
