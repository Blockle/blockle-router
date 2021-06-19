type Listener = () => void;

export interface ContextStore<S> {
  getState(): S;
  setState(state: S): void;
  subscribe(callback: Listener): () => void;
}

export function createContextStore<S>(initialState: S): ContextStore<S> {
  const listeners: Listener[] = [];
  let state = initialState;

  function getState(): S {
    return state;
  }

  function setState(nextState: S): void {
    if (state === nextState) {
      return;
    }

    state = nextState;

    listeners.forEach((listener) => listener());
  }

  function subscribe(callback: Listener): () => void {
    listeners.push(callback);

    return function unsubscribe() {
      const index = listeners.findIndex(callback);

      listeners.splice(index, 1);
    };
  }

  return {
    getState,
    setState,
    subscribe,
  };
}
