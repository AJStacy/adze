import { AdzeConstructor } from '../adze';

export interface Adze {
  alert(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
  fail(...args: unknown[]): void;
  success(...args: unknown[]): void;
  log(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  verbose(...args: unknown[]): void;
  label(name: string): AdzeConstructor;
}
