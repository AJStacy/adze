import { formats } from '../constants';
import { Level, LevelConfig } from './log';

/**
 * All valid log formats. These determine the style that is emitted.
 */
export type Format = (typeof formats)[number];

/**
 * Configuration for the logger.
 */
export interface Configuration {
  /**
   * The level of logs to render.
   */
  activeLevel: Level | number;
  /**
   * Should logs be cached for recall?
   */
  cache: boolean;
  /**
   * Add log meta data to the printed message.
   */
  dump: boolean;
  /**
   * The format to use when generating logs.
   */
  format: Format;
  /**
   * Additional metadata to be included with each log.
   */
  meta: Record<string, unknown>;
  /**
   * Applies middleware to execute along with the log.
   */
  middleware: unknown[];
  /**
   * Allow processing of logs but do not generate them automatically.
   *
   * **Default:** `false`
   */
  silent: boolean;
  /**
   * Add the timestamp to the printed message. This value is ignored if using the 'json'
   * or 'common' log formats.
   *
   * **Default:** `true`
   */
  showTimestamp: boolean;
  /**
   * Render emoji's in the log output.
   */
  withEmoji: boolean;
  /**
   * Configuration of all log levels.
   */
  levels: Record<string, LevelConfig>;
  /**
   * Filter logs based on the provided criteria.
   */
  filters: Filters;
}

/**
 * Configuration for filtering logs.
 */
export interface Filters {
  levels: LevelFilter;
  /**
   * Filter by log namespaces.
   */
  namespaces: FilterValues;
  /**
   * Filter by log labels.
   */
  labels: FilterValues;
}

/**
 * The log levels to filter.
 */
export type LevelFilter = '*' | string[] | number[] | [number, '-', number] | [string, '-', string];

/**
 * The values to include or exclude logs from printing.
 */
export interface FilterValues {
  /**
   * Values to only include in printing. This has a higher priority than `exclude`.
   */
  include: string[];
  /**
   * Values to exclude from printing.
   */
  exclude: string[];
}

/**
 * Partial configuration provided by the user.
 */
export type UserConfiguration = Partial<Configuration>;

/**
 * Extended configuration if the user specifies a the formatter as "common".
 */
export interface CommonLogConfiguration extends Configuration {
  /**
   * The name of the app this logger is being used in.
   */
  name: string;
  /**
   * The hostname of the machine generating logs.
   *
   * **Defaults:**
   * - Browsers - The browser's name and version.
   * - Node - The host IP address.
   */
  hostname: string;
}
