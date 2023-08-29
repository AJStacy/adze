interface AdzeStore {
  cache: [];
  globalConfiguration: unknown;
}

export function createStore(): AdzeStore {
  return {
    cache: [],
    globalConfiguration: null,
  };
}
