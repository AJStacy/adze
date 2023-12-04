import { GlobalStore } from '../global-store/global-store';

declare global {
  var $globalStore: GlobalStore;
  var ADZE_ENV: 'test' | 'dev';
  var ADZE_ENV_CONTEXT: 'global' | 'window';
  interface Window {
    $globalStore?: GlobalStore;
    ADZE_ENV?: 'test' | 'dev';
    ADZE_ENV_CONTEXT?: 'global' | 'window';
  }
}

/**
 * Returns the environment's global context.
 */
export function globalContext(): Window | typeof globalThis {
  return isBrowser() ? window : global;
}

/**
 * Validates that the current environment is `Window`.
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * TypeGuard to determine if the env value is the Window object.
 */
export function envIsWindow(env: Window | typeof globalThis): env is Window {
  return isBrowser();
};

/**
 * Static method that validates the current environment is Chrome.
 */
export function isChrome(): boolean {
  const _glbl = globalContext();
  if (envIsWindow(_glbl)) {
    return _glbl.navigator?.userAgent?.indexOf('Chrome') > -1;
  }
  return false;
}

/**
 * Static method that validates the current environment is Firefox.
 */
export function isFirefox(): boolean {
  const _glbl = globalContext();
  if (envIsWindow(_glbl)) {
    return _glbl.navigator?.userAgent?.indexOf('Firefox') > -1;
  }
  return false;
}

/**
 * Static method that validates the current environment is Safari.
 */
export function isSafari(): boolean {
  const _glbl = globalContext();
  if (envIsWindow(_glbl)) {
    return _glbl.navigator?.userAgent?.indexOf('Safari') > -1 && !isChrome();
  }
  return false;
}
