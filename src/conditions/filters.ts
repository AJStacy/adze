import {
  Defaults,
  FinalLogData,
  GlobalFilter,
  FilterFunction,
  FilterAllowedCallback,
  FinalLabeledLogData,
} from '../_contracts';
import { formatLevels, isFinalLabeledLogData } from '../util';

// ----- FILTER FORMATTING ----- //

/**
 * Parses the level filter on the configuration and reassigns it.
 * This is for increased performance so this calculation isn't done each
 * time a log is checking against the filter.
 */
export function parseFilterLevels(cfg: Defaults): Defaults {
  const new_cfg: Defaults = { ...cfg };
  if (filterIsSet(cfg, 'include', 'level') && new_cfg.filters.level?.include) {
    new_cfg.filters.level.include = formatLevels(new_cfg.filters.level.include, new_cfg);
  }
  if (filterIsSet(cfg, 'exclude', 'level') && new_cfg.filters.level?.exclude) {
    new_cfg.filters.level.exclude = formatLevels(new_cfg.filters.level.exclude, new_cfg);
  }
  return new_cfg;
}

// ----- FILTERING CONDITIONS ----- //

/**
 * Validate that the current level set on the log is allowed based on
 * the filter rules.
 */
export function levelAllowed(data: FinalLogData | FinalLabeledLogData): boolean {
  return filterAllowed(data.cfg, 'level', (filter, func) => {
    const source = data.cfg.filters?.level?.[filter] ?? ([] as number[]);
    return func<number>(source, data.level);
  });
}

/**
 * Validate that the current label set on the log is allowed based on
 * the filter rules.
 */
export function labelAllowed(data: FinalLogData | FinalLabeledLogData): boolean {
  return filterAllowed(data.cfg, 'label', (filter, func) => {
    // Check if this log has a label
    if (!isFinalLabeledLogData(data)) {
      // We want to exclude non-labeled logs if filter is set to "include"
      return filter !== 'include';
    }
    const source = data.cfg.filters?.label?.[filter] ?? ([] as string[]);
    return func<string>(source, data.label.name ?? '');
  });
}

/**
 * Validate that at least one of the current namespaces set on the log
 * is allowed based on the filter rules.
 */
export function namespaceAllowed(data: FinalLogData | FinalLabeledLogData): boolean {
  return filterAllowed(data.cfg, 'namespace', (filter, func) => {
    const filter_ns = data.cfg.filters?.namespace?.[filter] ?? ([] as string[]);

    const log_ns = data.namespace;

    if (log_ns) {
      // Namespace log value is an array. Check each namespace value.
      const arr = log_ns.map((val) => func<string>(filter_ns, val));

      // If filter is include, namespace is allowed if at least one passes and the log has
      // at least one namespace. Logs without namespaces are thrown out.
      if (filter === 'include') {
        return arr.includes(true);
      }
      // If filter is exclude, namspace is allowed if all pass
      return !arr.includes(false);
    } else if (filter === 'include') {
      // If the log has no namespaces defined and the filter is include we should hide the log.
      return false;
    }
  });
}

/**
 * Wrapper around the filter methods to handle some basic setup for validating
 * the filter values.
 */
function filterAllowed(cfg: Defaults, category: GlobalFilter, cb: FilterAllowedCallback): boolean {
  const filter_type = filterType(cfg, category);
  if (filter_type) {
    const [filter, func] = filter_type;
    const result = cb(filter, func);
    if (result !== undefined) {
      return result;
    }
  }
  return true;
}

/**
 * Returns tuples indicating what filter type is active. Include gets precedence over exclude.
 */
function filterType(
  cfg: Defaults,
  category: GlobalFilter
): ['include', FilterFunction] | ['exclude', FilterFunction] | undefined {
  switch (true) {
    case filterIsSet(cfg, 'include', category):
      return ['include', isIncluded];
    case filterIsSet(cfg, 'exclude', category):
      return ['exclude', isNotExcluded];
  }
}

/**
 * Is the log in the included filter?
 */
function isIncluded<T>(source: T[], value: T): boolean {
  return source.length > 0 && source.indexOf(value) !== -1;
}

/**
 * Is the log not in the excluded filter?
 */
function isNotExcluded<T>(source: T[], value: T): boolean {
  return source.length > 0 && source.indexOf(value) === -1;
}

/**
 * Has the user defined rules for a specific filter?
 */
function filterIsSet(cfg: Defaults, type: 'include' | 'exclude', filter: GlobalFilter): boolean {
  const include_prop = cfg?.filters?.[filter]?.[type] ?? [];
  return include_prop.length > 0;
}
