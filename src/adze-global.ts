import { Label, LabelMap, LevelSelector, LogListener, UserConfiguration } from './_types';
import { defaultConfiguration } from './constants';
import { normalizeLevelSelector } from './functions';
import Log from './log';
import Tools from './tools';

/**
 * Maps the log listeners to a number.
 *
 * The number could be a log level or a listener ID.
 */
type ListenersMap = Map<number, Map<number, LogListener>>;

export default class AdzeGlobal<Meta extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * Global Adze configuration overrides.
   */
  private config: UserConfiguration<Meta>;

  /**
   * Incrementing ID counter for identifying logs.
   */
  private pidCounter = 1;

  /**
   * All log labels.
   */
  private labels: LabelMap = new Map();

  /**
   * Counter for incrementing listener IDs.
   */
  private _listenerCounter = 0;

  /**
   * Map of log levels to log listeners
   */
  private _levelsToListeners: ListenersMap = new Map();

  /**
   * Cache of logs that have been terminated.
   */
  private _cache: Log[] = [];

  constructor(configuration: UserConfiguration<Meta> = {}) {
    this.config = configuration;
  }

  /**
   * Returns the cache of logs that have been terminated.
   */
  public get cache(): Log[] {
    return this._cache;
  }

  /**
   * Get the global Adze configuration overrides.
   */
  public get configuration(): UserConfiguration {
    return this.config;
  }

  /**
   * Get the next process ID.
   */
  public get pid(): number {
    const current = this.pidCounter;
    this.pidCounter++;
    return current;
  }

  /**
   * Tools for rerendering and filtering cached logs.
   */
  public get tools(): Tools {
    return new Tools(this);
  }

  /**
   * Adds a log to the log cache.
   */
  public addLogToCache(log: Log): void {
    if (this._cache.length < (this.config.cacheSize ?? 300)) {
      this._cache.push(log);
    }
  }

  /**
   * Clears the log cache.
   */
  public clearCache(): void {
    this._cache = [];
  }

  /**
   * Get a label by name.
   */
  public getLabel(name: string): Label | undefined {
    return this.labels.get(name);
  }

  /**
   * Sets a new label or overwrites an existing one.
   */
  public setLabel(name: string, label: Label): void {
    this.labels.set(name, label);
  }

  /**
   * Adds a log listener that will be called after a log has been terminated.
   */
  public addListener(levels: LevelSelector, listener: LogListener): number {
    const id = (this._listenerCounter += 1);
    const normalizedLevels = normalizeLevelSelector(
      { ...defaultConfiguration.levels, ...(this.config.levels ?? {}) },
      levels
    );
    normalizedLevels.forEach((level: number) => {
      if (this._levelsToListeners.has(level)) {
        const levelContainer = this._levelsToListeners.get(level) as Map<number, LogListener>;
        levelContainer.set(id, listener);
      } else {
        this._levelsToListeners.set(level, new Map([[id, listener]]));
      }
    });
    return id;
  }

  /**
   * Removes a log listener by its ID.
   */
  public removeListener(id: number): void {
    this._levelsToListeners.forEach((levelContainer) => {
      levelContainer.delete(id);
    });
  }

  /**
   * Returns an array of log listener callback functions.
   */
  public getListeners(level: number): LogListener[] {
    return Array.from(this._levelsToListeners.get(level)?.values() ?? []);
  }
}
