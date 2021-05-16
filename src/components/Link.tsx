import React, {
  AnchorHTMLAttributes,
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { RouteGroupContext } from '../context/RouteGroupContext';
import { useHistory } from '../hooks/useHistory';
import { Params } from '../types';
import { createPathsMatcher } from '../utils/createPathMatcher';

const isModifierEvent = (event: React.MouseEvent<HTMLAnchorElement>) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  activeClassName?: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  to: string;
}

export const Link: FC<Props> = ({
  activeClassName = 'is-active',
  children,
  className,
  replace = false,
  to,
  ...restProps
}) => {
  const history = useHistory();
  const routerContext = useContext(RouteGroupContext);
  const list = [to];
  const getMatch = useMemo(() => createPathsMatcher(list, true), list);
  // Get a route match on first render only
  const initialMatch = useMemo(() => getMatch(history.location.pathname), []);
  const [match, setMatch] = useState<null | Params>(initialMatch);

  useLayoutEffect(() => {
    // Register route
    return routerContext.register({
      getMatch,
      setMatch,
      noMatch: false,
      exclude: true,
    });
  }, list);

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!event.defaultPrevented && event.button === 0 && !isModifierEvent(event)) {
      event.preventDefault();

      history.push(to);
    }
  }

  return (
    <a
      href={to}
      className={[className, !!match && activeClassName].join(' ')}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </a>
  );
};
