import { useContext } from 'react';
import { RouterContext } from '../context/RouterContext';

export const useHistory = () => {
  return useContext(RouterContext).history;
};
