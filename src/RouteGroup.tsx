import React, { useContext, useEffect, useRef, useMemo } from 'react';
import { RouteGroupContext, RouterContext } from './context';
import { RouteGroupContext as IRouteGroupContext, RouteRef } from './types';

interface RouteGroupProps {
  children: React.ReactNode;
}

const RouteGroup = ({ children }: RouteGroupProps) => {
  const { history } = useContext(RouterContext);
  const routes = useRef<RouteRef[]>([]);
  const context = useMemo(
    (): IRouteGroupContext => ({
      baseUrl: '',
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
        ({ paths, noMatch, setMatch }) => {
          // Skip "404" routes
          if (noMatch) {
            return true;
          }

          const match = paths.some(path => {
            const match = path.exec(pathname);

            if (match) {
              containsMatch = true;
            }

            return !!match;
          });

          //
          setMatch(match);

          return false;
        },
      );

      noMatchRoutes.forEach(({ setMatch }) => setMatch(!containsMatch));
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
