import { FC, MouseEventHandler } from 'react';

export interface LinkProps {
  activeClassName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  replace?: boolean;
  to: string;
}

export const Link: FC<LinkProps> = () => {
  return null;
};
