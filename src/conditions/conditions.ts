import { Defaults, LogLevelDefinition } from '../_contracts';
import { Env } from '../Env';
import { getSearchParams } from '../util';

/**
 * Determine the fate of whether this log will terminate.
 */
export function allowed(cfg: Defaults, def: LogLevelDefinition): boolean {
  return levelActive(def, cfg.log_level) && notTestEnv();
}

/**
 * Check if the log level is high enough for the log to terminate.
 */
export function levelActive(def: LogLevelDefinition, level: number): boolean {
  return def.level <= level;
}

/**
 * Verify that this log is not in a test environment by checking the environment context
 * or URL params if within a browser context. Prevent termination of the log if it is 'test'.
 */
export function notTestEnv(): boolean {
  // Allow for URL Param of ADZE_ENV when in the browser.
  const adze_env = Env.global()?.ADZE_ENV;
  const param = getSearchParams()?.get('ADZE_ENV');
  return (adze_env ?? param ?? '') !== 'test';
}