// eslint-ignore-file
// import { Configuration, Constraints } from './_contracts';
// import { Log } from './log';
// import { Printer } from './printers';
// import { Env } from './env';
// import { Adze } from './_contracts';
import { getEnv } from './env';
import { createStore } from './store';

type Configuration = Record<string, unknown>;

/**
 * The entry point for creating Adze logs. This factory function can be used directly or configuration
 * can be provided and the result can be sealed into a new variable. This allows for multiple
 * logging instances with different configurations. Refer to the `seal()` modifier.
 *
 * **--- Default levels ---**
 *
 * + (0) alert
 * + (1) error
 * + (2) warn
 * + (3) info
 * + (4) fail
 * + (5) success
 * + (6) log
 * + (7) debug
 * + (8) verbose
 */
// export function adze<C extends Constraints>(user_cfg: Configuration = {}): Log<C> {
//   return new Log<C>(Printer, new Env(), user_cfg);
// }
export class adze {
  public static cfg(configuration: Configuration): AdzeConstructor {
    return adze.configure(configuration);
  }

  public static configure(configuration: Configuration): AdzeConstructor {
    return new AdzeConstructor(configuration);
  }

  public static alert(...args: unknown[]): void {
    // comment
  }

  public static error(): void {
    // comment
  }

  public static warn(): void {
    // comment
  }

  public static info(): void {
    // comment
  }

  public static fail(): void {
    // comment
  }

  public static success(): void {
    // comment
  }

  public static log(): void {
    // comment
  }

  public static debug(): void {
    // comment
  }

  public static verbose(): void {
    // comment
  }

  public static label(name: string): AdzeConstructor {
    return new AdzeConstructor().label(name);
  }
}

export class AdzeConstructor {
  private configuration: Record<string, unknown>;

  constructor(configuration?: Record<string, unknown>) {
    this.configuration = configuration ?? {};
    if (storeMissing()) {
      getEnv().$adzeStore = createStore();
    }
  }

  public alert(...args: unknown[]): void {
    // comment
  }

  public error(...args: unknown[]): void {
    // comment
  }

  public warn(...args: unknown[]): void {
    // comment
  }

  public info(...args: unknown[]): void {
    // comment
  }

  public fail(...args: unknown[]): void {
    // comment
  }

  public success(...args: unknown[]): void {
    // comment
  }

  public log(...args: unknown[]): void {
    // comment
  }

  public debug(...args: unknown[]): void {
    // comment
  }

  public verbose(...args: unknown[]): void {
    // comment
  }

  public label(name: string): AdzeConstructor {
    // comment
    console.log(name);
    return this;
  }
}

adze.configure({}).label('doobadoo').alert('derp');

// export function

// export function setOverrides() {}

function storeMissing(): boolean {
  return !storeExists();
}

function storeExists(): boolean {
  const _global = window ?? global;
  return _global.$adzeStore !== undefined;
}
