import React, { FC, useEffect } from 'react';
import { RouteGroupContext, RouteGroupContextType } from '../context/RouteGroupContext';
import { createContextStore } from '../contextStore';
import { useHistory } from '../hooks/useHistory';
import { useRefMemo } from '../hooks/useRefMemo';

export interface RouterProps {
  baseUrl?: string;
}

export const RouteGroup: FC<RouterProps> = ({ children, baseUrl = '/' }) => {
  const history = useHistory();
  const store = useRefMemo(() =>
    createContextStore<RouteGroupContextType>({ baseUrl, routes: [] }),
  );

  // Update "baseUrl"
  useEffect(() => {
    const state = store.getState();

    store.setState({
      ...state,
      baseUrl,
    });
  }, [baseUrl]);

  // Update on history change
  useEffect(() => {
    function update() {
      let hasMatch = false;
      const { routes } = store.getState();
      const { pathname } = history.location;

      const noMatchRoutes = routes.filter(({ exclude, matcher, noMatch, updateMatch }) => {
        // Skip "404" routes
        if (noMatch) {
          return true;
        }

        // Continue to check if route matches given pathname
        const match = matcher(pathname);

        if (match && !exclude) {
          hasMatch = true;
        }

        // Update state of <Route /> components
        updateMatch(match);

        return false;
      });

      noMatchRoutes.forEach(({ updateMatch }) => updateMatch(hasMatch ? null : {}));
    }

    update();

    const unlistenHistory = history.listen(update);
    const unlistenStore = store.subscribe(update);

    return () => {
      unlistenHistory();
      unlistenStore();
    };
  }, []);

  return <RouteGroupContext.Provider value={store}>{children}</RouteGroupContext.Provider>;
};
