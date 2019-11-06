import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { RouteGroupContext, RouterContext } from './context';
import { RouteGroupContext as IRouteGroupContext, RouteRef } from './types';

interface RouteGroupProps {
  children: React.ReactNode;
}

const RouteGroup = ({ children }: RouteGroupProps) => {
  const { history } = useContext(RouterContext);
  const routes = useRef<RouteRef[]>([]);
  const [noMatch, setNoMatch] = useState(false);
  const context = useMemo(
    (): IRouteGroupContext => ({
      baseUrl: '',
      noMatch: false,
      register: route => {
        routes.current = [...routes.current, route];

        return () => {
          routes.current = routes.current.filter(_route => route !== _route);
        };
      },
    }),
    [noMatch],
  );

  // useEffect(() => {
  //   console.log('KEKEKE', routes.current);
  // }, [routes.current.length]);

  useEffect(() => {
    const update = () => {
      const { pathname } = history.location;
      let containsMatch = false;

      console.log('checkng', [...routes.current]);

      routes.current.forEach(({ paths, noMatch, setMatch }) => {
        // Skip "404" routes
        if (noMatch) {
          return;
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
      });

      if (!containsMatch) {
        console.log('404');
        setNoMatch(true);
      }
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
