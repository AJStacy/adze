import { LogRender, Collection, LogData, LevelFilter, LabeledLogData } from '../_contracts';
import { Log } from '../log';
import { formatLevels, isFinalLabeledLogData, isString } from '../util';

/**
 * Filter a collection of logs by the namespace.
 */
export function filterNamespace(collection: Collection = [], ns: string[]): Collection {
  return filterCollection(collection, (log) => {
    const log_ns = log.namespace;
    if (log_ns) {
      // Loop over each log ns value and see if any match any ns value.
      return log_ns.map((val) => (isString(ns) ? val === ns : ns.includes(val))).includes(true);
    }
    return false;
  });
}

/**
 * Filter and render the collection of logs by the label.
 */
export function filterLabel(collection: Collection = [], lbl: string): Collection {
  return filterCollection(collection, (log) => {
    if (isFinalLabeledLogData(log)) {
      return log.label?.name === lbl;
    }
    return false;
  });
}

/**
 * Filter the collection of logs by their log level.
 */
export function filterLevel(collection: Collection = [], levels: LevelFilter): Collection {
  return filterCollection(collection, (log) => {
    // Calculating the formatted levels for each log because they could have different config
    return formatLevels(levels, log.cfg).includes(log.level ?? Infinity);
  });
}

/**
 * Executes a callback on each value of a collection. The callback receives a
 * log data object for each log in the collection. If a truthy value is returned the
 * current log of the iteration will be added into a new collection. If a falsy value is
 * returned it will be omitted.
 */
export function filterCollection(
  collection: Collection,
  cb: (log: LogData | LabeledLogData) => boolean
): Collection {
  return collection.reduce((acc, log) => {
    const result = cb(log.data);
    return result ? acc.concat([log]) : acc;
  }, [] as Collection);
}

/**
 * If the provided log has been previously rendered, this function
 * re-renders it to the console.
 */
export function rerender(log: Log<any>): void {
  if (log.render) {
    render(log.render);
  }
}

/**
 * Render a log to the console based on a log render object.
 */
export function render([method, args]: LogRender): void {
  console[method](...args);
}
