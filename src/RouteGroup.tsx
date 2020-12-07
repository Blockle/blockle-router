import React, { useContext, useEffect, useMemo, useRef } from 'react';
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

      const noMatchRoutes = routes.current.filter(({ matcher, noMatch, setMatch }) => {
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
      });

      noMatchRoutes.forEach(({ setMatch }) => setMatch(containsMatch ? null : {}));
    };

    const unlisten = history.listen(update);

    // Initial render
    update();

    return unlisten;
  }, []);

  return <RouteGroupContext.Provider value={context}>{children}</RouteGroupContext.Provider>;
};

export default RouteGroup;
