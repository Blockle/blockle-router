import { ReactNode } from 'react';
import { Params } from '../types';

export type RenderComponent = (match: boolean, params: Params) => ReactNode;

interface RenderRoute {
  children?: ReactNode;
  match: null | Params;
  render?: RenderComponent;
}

export function renderRoute({ children, match, render }: RenderRoute): ReactNode | null {
  if (render) {
    return render(!!match, match || {});
  }

  if (match) {
    return children;
  }

  return null;
}
