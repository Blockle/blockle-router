import React, { AnchorHTMLAttributes, FC, MouseEventHandler } from 'react';
import { useHistory } from '../hooks/useHistory';
import { Route } from './Route';

const isModifierEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  activeClassName?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  replace?: boolean;
  to: string;
}

export const Link: FC<LinkProps> = ({
  activeClassName = 'is-active',
  children,
  className,
  onClick,
  replace = false,
  to,
  ...restProps
}) => {
  const history = useHistory();

  function clickHandler(event: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(event);
    }

    if (!event.defaultPrevented && event.button === 0 && !isModifierEvent(event)) {
      event.preventDefault();

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  }

  return (
    <Route
      exclude
      exact
      path={to}
      render={(match) => (
        <a
          href={to}
          className={[className, match ? activeClassName : ''].join(' ')}
          onClick={clickHandler}
          {...restProps}
        >
          {children}
        </a>
      )}
    />
  );
};
