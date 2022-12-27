import { LabeledLog, Log } from '../log';
import { LogLevelDefinition, ConsoleMethod, Defaults, LabelData } from '.';

/**
 * The keys of the default terminating log methods included with Adze.
 */
export type TerminatingMethodKeys =
  | 'alert'
  | 'error'
  | 'warn'
  | 'fail'
  | 'success'
  | 'info'
  | 'log'
  | 'debug'
  | 'verbose';

/**
 * To keep the size of this library down we are providing
 * the user with standard browser timestamp values.
 */
export interface LogTimestamp {
  unixMilli: number;
  utc: string;
  utcTimezoneOffset: number;
  iso8601: string;
}

type PrintMethodNames =
  | 'Dir'
  | 'Dirxml'
  | 'Log'
  | 'Group'
  | 'GroupCollapsed'
  | 'GroupEnd'
  | 'Trace'
  | 'Table';

/**
 * Printer class method names. This is used within Log internally
 * for selecting which Printer method to use to render the Log.
 */
export type PrintMethod = `print${PrintMethodNames}`;

/**
 * Interface for unknown meta data values provided by the user.
 */
export interface MetaData {
  [key: string]: unknown;
}

/**
 * The render value for a Log.
 */
type Arguments = unknown[];
export type LogRender = [ConsoleMethod, Arguments];

/**
 * Type alias for an array of Log instances.
 */
export type Collection = Array<Log<Constraints> | LabeledLog<Constraints>>;

/**
 * Log data object generated from a Log instance. This is
 * primarily used for listeners and log cloning.
 */
export interface LogData {
  args: unknown[] | null;
  assertion?: boolean;
  cfg: Defaults;
  definition: LogLevelDefinition | null;
  showTimestamp: boolean;
  expression?: boolean;
  isSilent: boolean;
  printed: boolean;
  level: number | null;
  meta: MetaData;
  namespace: string[] | null;
  stacktrace: string | null;
  timeNow: string | null;
  timestamp: LogTimestamp | null;
}

/**
 * Log data object generated from a Log instance after it
 * has been terminated. The values in this extended interface
 * reflect that they are no longer possibly null.
 */
export interface FinalLogData extends LogData {
  level: number;
  definition: LogLevelDefinition;
  args: unknown[];
  timestamp: LogTimestamp;
}

/**
 * LabeledLog data object generated from a Log instance. This is
 * primarily used for listeners and log cloning.
 */
export interface LabeledLogData extends LogData {
  context: MetaData;
  dumpContext: boolean;
  label: LabelData;
}

/**
 * LabeledLog data object generated from a Log instance after it
 * has been terminated. The values in this extended interface
 * reflect that they are no longer possibly null.
 */
export interface FinalLabeledLogData extends LabeledLogData {
  level: number;
  definition: LogLevelDefinition;
  args: unknown[];
  timestamp: LogTimestamp;
}

/**
 * The final value of a log after it has been terminated. This is useful for
 * gleaning the final render information and getting the Log instance for
 * unit testing purposes.
 */
export interface TerminatedLog<C extends Constraints, I extends Log<C>> {
  log: I;
  render: LogRender | null;
  printed: boolean;
}

export interface Constraints {
  allowedNamespaces: string;
}

/**
 * This interface describes the possible output when generating logs with
 * machineReadable mode enabled.
 */
export interface JsonOutput {
  method: ConsoleMethod;
  level: number;
  levelName: string;
  args: any[];
  timestamp: LogTimestamp;
  groupAction?: 'open' | 'close';
  label?: string;
  namespace?: string[];
  count?: number;
  timeEllapsed?: string;
  timeNow?: string;
  context?: Record<string, unknown>;
  stacktrace?: string;
  meta?: Record<string, unknown>;
}
