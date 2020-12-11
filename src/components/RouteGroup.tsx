import React, { FC, useContext, useEffect, useMemo, useRef } from 'react';
import { RouteGroupContext, RouteGroupContextType } from '../context/RouteGroupContext';
import { useHistory } from '../hooks/useHistory';
import { RouteRef } from '../types';

interface Props {
  children: React.ReactNode;
  baseUrl?: string;
}

export const RouteGroup: FC<Props> = ({ children, baseUrl }) => {
  const history = useHistory();
  const parentContext = useContext(RouteGroupContext);
  const routes = useRef<RouteRef[]>([]);

  const context: RouteGroupContextType = useMemo(
    (): RouteGroupContextType => ({
      baseUrl: baseUrl || parentContext.baseUrl,
      register: (route) => {
        routes.current = [...routes.current, route];

        return () => {
          routes.current = routes.current.filter((_route) => route !== _route);
        };
      },
    }),
    [baseUrl],
  );

  useEffect(() => {
    const update = () => {
      const { pathname } = history.location;
      let hasMatch = false;

      const noMatchRoutes = routes.current.filter(({ getMatch, noMatch, setMatch }) => {
        // Skip "404" routes
        if (noMatch) {
          return true;
        }

        // Continue to check if route matches given pathname
        const match = getMatch(pathname);

        if (match) {
          hasMatch = true;
        }

        // Update state of <Route /> components
        setMatch(match);

        return false;
      });

      noMatchRoutes.forEach(({ setMatch }) => setMatch(hasMatch ? null : {}));
    };

    // Initial render, need to update the state of `noMatch` routes
    update();

    return history.listen(update);
  }, [baseUrl]);

  return <RouteGroupContext.Provider value={context}>{children}</RouteGroupContext.Provider>;
};
