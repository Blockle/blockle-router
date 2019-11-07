import React, { useContext, useEffect, useRef, useMemo } from 'react';
import { RouteGroupContext, RouterContext } from './context';
import { RouteGroupContext as IRouteGroupContext, RouteRef } from './types';

interface RouteGroupProps {
  children: React.ReactNode;
  baseUrl?: string;
}

const RouteGroup = ({ children, baseUrl }: RouteGroupProps) => {
  const { history } = useContext(RouterContext);
  const parentContext = useContext(RouteGroupContext);
  const routes = useRef<RouteRef[]>([]);

  const context = useMemo(
    (): IRouteGroupContext => ({
      baseUrl: baseUrl || parentContext.baseUrl,
      register: route => {
        routes.current = [...routes.current, route];

        return () => {
          routes.current = routes.current.filter(_route => route !== _route);
        };
      },
    }),
    [],
  );

  useEffect(() => {
    const update = () => {
      const { pathname } = history.location;
      let containsMatch = false;

      const noMatchRoutes = routes.current.filter(
        ({ matcher, noMatch, setMatch }) => {
          // Skip "404" routes
          if (noMatch) {
            return true;
          }

          const match = matcher(pathname);

          if (match) {
            containsMatch = true;
          }

          //
          setMatch(match);

          return false;
        },
      );

      noMatchRoutes.forEach(({ setMatch }) =>
        setMatch(containsMatch ? null : {}),
      );
    };

    history.listen(update);

    // Initial render
    update();
  }, []);

  return (
    <RouteGroupContext.Provider value={context}>
      {children}
    </RouteGroupContext.Provider>
  );
};

export default RouteGroup;
