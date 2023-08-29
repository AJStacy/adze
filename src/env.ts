declare global {
  interface Window {
    $adzeStore?: unknown;
    ADZE_ENV?: 'test' | 'dev';
    ADZE_ENV_CONTEXT?: 'global' | 'window';
  }
  namespace NodeJS {
    export interface Global {
      $adzeStore?: unknown;
      ADZE_ENV?: 'test' | 'dev';
      ADZE_ENV_CONTEXT?: 'global' | 'window';
    }
  }
}

export function isWindow(_global?: Window | NodeJS.Global): _global is Window {
  return typeof window !== 'undefined';
}

export function isNode(_global?: Window | NodeJS.Global): _global is NodeJS.Global {
  return !isWindow(_global);
}

export function getEnv(): Window | NodeJS.Global {
  return window ?? global;
}
