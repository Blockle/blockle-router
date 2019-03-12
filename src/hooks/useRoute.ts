import { RouterContext } from '../context';
import { useContext } from 'react';

export const useRoute = (path: string) => {
  const context = useContext(RouterContext);
  const match = true;
  const params = {};

  console.log(context);

  return {
    match,
    params,
  };
};
