import React from 'react';

import { IRouterContext } from './types';

export const RouterContext = React.createContext<IRouterContext>(
  {} as IRouterContext,
);
