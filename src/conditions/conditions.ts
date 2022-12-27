import { Defaults, FinalLabeledLogData, FinalLogData, LogLevelDefinition } from '../_contracts';
import { levelAllowed, labelAllowed, namespaceAllowed } from '.';
import { Env } from '../env';
import { getSearchParams } from '../util';

/**
 * Determine the fate of whether this log will terminate.
 */
export function allowed(data: FinalLogData | FinalLabeledLogData): boolean {
  return (
    levelActive(data.definition, data.cfg.logLevel) &&
    notTestEnv() &&
    passesFilters(data.cfg, data) &&
    notSilent(data)
  );
}

/**
 * Check if the log level is high enough for the log to terminate.
 */
export function levelActive(def: LogLevelDefinition, level: number): boolean {
  return def.level <= level;
}

/**
 * Validates the log against the configured filters.
 */
export function passesFilters(cfg: Defaults, data: FinalLogData | FinalLabeledLogData): boolean {
  return (
    !(cfg?.filters.hideAll ?? false) &&
    levelAllowed(data) &&
    labelAllowed(data) &&
    namespaceAllowed(data)
  );
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

export function notSilent(data: FinalLogData | FinalLabeledLogData): boolean {
  return data.isSilent === false;
}
