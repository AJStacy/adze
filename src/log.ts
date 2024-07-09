import {
  Configuration,
  Format,
  FormatterConstructor,
  LevelConfig,
  LogData,
  Modifier,
  ModifierData,
  UserConfiguration,
} from './_types';
import {
  captureTimeNow,
  formatTime,
  getGlobalStore,
  globalContext,
  hrtime,
  isMethodWithArgs,
  mergeConfiguration,
  stacktrace,
} from './functions';
import { formatISO } from 'date-fns/formatISO';
import PrettyFormatter from './formatters/pretty/pretty';
import { Middleware } from './middleware';

export default class Log<N extends string = string> {
  /**
   * The global context object.
   */
  protected globalContext: Window | typeof globalThis;

  /**
   * The configuration for the adze log.
   */
  private _cfg: Configuration;

  /**
   * Incomplete log data.
   */
  protected _modifierData: ModifierData;

  /**
   * The log data object.
   */
  protected _data?: LogData;

  /**
   * Queue up modifiers to ensure they are in the correct order when executed.
   */
  protected modifierQueue: Modifier[] = [];

  constructor(cfg: UserConfiguration = {}, modifierData?: ModifierData) {
    this.globalContext = globalContext();
    this._modifierData = modifierData ?? {};
    this._cfg = mergeConfiguration({}, cfg, this.globalContext?.$adzeGlobal?.configuration);
    this.doHook((m) => (m.constructed ? m.constructed(this) : null));
  }

  ////////////////////////////////////////////////////////
  // Getters and Setters
  ////////////////////////////////////////////////////////

  public get data(): LogData | undefined {
    return this.data;
  }

  public get modifierData(): ModifierData {
    return this._modifierData;
  }

  public get configuration(): Configuration {
    return this._cfg;
  }

  ////////////////////////////////////////////////////////
  // Terminators
  ////////////////////////////////////////////////////////

  /**
   * Terminates the log at the *alert* level.
   *
   * **Default Level = "alert" or 0**
   *
   * This level is useful for calling alert to
   * important information and lives at the lowest level.
   *
   * You should use this sparingly since it's level is lower
   * than error.
   *
   * This is a non-standard API.
   */
  public alert(...args: unknown[]): void {
    this.terminate('alert', args);
  }

  /**
   * Terminates the log at the *alert* level.
   *
   * **Default Level = "alert" or 0**
   *
   * This level is useful for calling alert to
   * important information and lives at the lowest level.
   *
   * You should use this sparingly since it's level is lower
   * than error.
   *
   * This is a non-standard API.
   */
  public static alert(...args: unknown[]): void {
    return new this().alert(...args);
  }

  /**
   * Terminates the log at the *error* level.
   *
   * **Default Level = "error" or 1**
   *
   * Use this for logging fatal errors or errors that
   * impact functionality of your application.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
   */
  public error(...args: unknown[]): void {
    this.terminate('error', args);
  }

  /**
   * Terminates the log at the *error* level.
   *
   * **Default Level = "error" or 1**
   *
   * Use this for logging fatal errors or errors that
   * impact functionality of your application.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
   */
  public static error(...args: unknown[]): void {
    return new this().error(...args);
  }

  /**
   * Terminates the log at the *warning* level.
   *
   * **Default Level = "warn" or 2**
   *
   * Use this for logging issues that may impact
   * app performance in a less impactful way than
   * an error.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn)
   */
  public warn(...args: unknown[]): void {
    this.terminate('warn', args);
  }

  /**
   * Terminates the log at the *warning* level.
   *
   * **Default Level = "warn" or 2**
   *
   * Use this for logging issues that may impact
   * app performance in a less impactful way than
   * an error.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn)
   */
  public static warn(...args: unknown[]): void {
    return new this().warn(...args);
  }

  /**
   * Terminates the log at the *info* level.
   *
   * **Default Level = "info" or 3**
   *
   * Use this for logging general insights into your
   * application. This level does not indicate any
   * problems.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/info)
   */
  public info(...args: unknown[]): void {
    this.terminate('info', args);
  }

  /**
   * Terminates the log at the *info* level.
   *
   * **Default Level = "info" or 3**
   *
   * Use this for logging general insights into your
   * application. This level does not indicate any
   * problems.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/info)
   */
  public static info(...args: unknown[]): void {
    return new this().info(...args);
  }

  /**
   * Terminates the log at the *fail* level.
   *
   * **Default Level = "fail" or 4**
   *
   * Use this for logging network communication errors
   * that do not break your application.
   *
   * This is a non-standard API.
   */
  public fail(...args: unknown[]): void {
    this.terminate('fail', args);
  }

  /**
   * Terminates the log at the *fail* level.
   *
   * **Default Level = "fail" or 4**
   *
   * Use this for logging network communication errors
   * that do not break your application.
   *
   * This is a non-standard API.
   */
  public static fail(...args: unknown[]): void {
    return new this().fail(...args);
  }

  /**
   * Terminates the log at the *success* level.
   *
   * **Default Level = "success" or 5**
   *
   * Use this for logging successful network communication.
   *
   * This is a non-standard API.
   */
  public success(...args: unknown[]): void {
    this.terminate('success', args);
  }

  /**
   * Terminates the log at the *success* level.
   *
   * **Default Level = "success" or 5**
   *
   * Use this for logging successful network communication.
   *
   * This is a non-standard API.
   */
  public static success(...args: unknown[]): void {
    return new this().success(...args);
  }

  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "log" or 6**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  public log(...args: unknown[]): void {
    this.terminate('log', args);
  }

  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "log" or 6**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  public static log(...args: unknown[]): void {
    return new this().log(...args);
  }

  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "debug" or 7**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  public debug(...args: unknown[]): void {
    this.terminate('debug', args);
  }

  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = "debug" or 7**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  public static debug(...args: unknown[]): void {
    return new this().debug(...args);
  }

  /**
   * Terminates the log at the *verbose* level.
   *
   * **Default Level = "verbose" or 8**
   *
   * Use this for logging extremely detailed debugging
   * information. Use this level when the values you are
   * logging are granular enough that they are no longer
   * easily human readable.
   *
   * This is a non-standard API.
   */
  public verbose(...args: unknown[]): void {
    this.terminate('verbose', args);
  }

  /**
   * Terminates the log at the *verbose* level.
   *
   * **Default Level = "verbose" or 8**
   *
   * Use this for logging extremely detailed debugging
   * information. Use this level when the values you are
   * logging are granular enough that they are no longer
   * easily human readable.
   *
   * This is a non-standard API.
   */
  public static verbose(...args: unknown[]): void {
    return new this().verbose(...args);
  }

  /**
   * Seals the configuration of a log and returns a function that
   * constructs a new log with the same configuration.
   *
   * **Example:**
   * ```javascript
   * const sealed = adze.withEmoji.ns('sealed').label('sealed-label').seal();
   * sealed.success('Success!'); // -> prints "#sealed [sealed-label] Success!"
   * sealed.log('Another log.'); // -> prints "#sealed [sealed-label] Another log."
   * ```
   */
  public seal<N extends string = string>(cfg?: UserConfiguration): Log<N> {
    this.runModifierQueue();
    this.mergeConfiguration({ ...this._cfg, ...cfg });
    return new Log(structuredClone(this._cfg), structuredClone(this._modifierData));
  }

  /**
   * Seals the configuration of a log and returns a function that
   * constructs a new log with the same configuration.
   *
   * **Example:**
   * ```javascript
   * const sealed = adze.withEmoji.ns('sealed').label('sealed-label').seal();
   * sealed.success('Success!'); // -> prints "#sealed [sealed-label] Success!"
   * sealed.log('Another log.'); // -> prints "#sealed [sealed-label] Another log."
   * ```
   */
  public static seal<N extends string = string>(cfg?: UserConfiguration): Log<N> {
    return new this().seal(cfg);
  }

  ////////////////////////////////////////////////////////
  // Modifiers
  ////////////////////////////////////////////////////////

  /**
   * Generates a log message if the provided expression is falsey.
   */
  public assert(expression: boolean): this {
    this.modifierQueue.push((data) => {
      data.assertion = expression;
      return data;
    });
    return this;
  }

  /**
   * Generates a log message if the provided expression is falsey.
   */
  public static assert(expression: boolean): Log {
    return new this().assert(expression);
  }

  /**
   * Configures the log instance. This is useful for applying many configuration values at once
   * rather than calling each modifier individually.
   */
  public configure(cfg: UserConfiguration): this {
    this.modifierQueue.unshift((data) => {
      this.mergeConfiguration(cfg);
      return data;
    });
    return this;
  }

  /**
   * Configures the log instance. This is useful for applying many configuration values at once
   * rather than calling each modifier individually.
   */
  public static configure<T extends typeof Log>(cfg: UserConfiguration): InstanceType<T> {
    return new Log().configure(cfg) as InstanceType<T>;
  }

  /**
   * Alias for the `configure` method.
   *
   * Configures the log instance. This is useful for applying many configuration values at once
   * rather than calling each modifier individually.
   */
  public cfg<T extends typeof Log>(cfg: UserConfiguration): InstanceType<T> {
    return this.configure(cfg) as InstanceType<T>;
  }

  /**
   * Alias for the `configure` method.
   *
   * Configures the log instance. This is useful for applying many configuration values at once
   * rather than calling each modifier individually.
   */
  public static cfg<T extends Log>(
    this: new (cfg?: UserConfiguration, modifierData?: ModifierData) => T,
    cfg: UserConfiguration
  ): T {
    return new this().configure(cfg);
  }

  /**
   * Adds to the log count for log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
   */
  public get count(): this {
    this.modifierQueue.push((data) => {
      if (data.label) {
        data.label.count = data.label.count !== undefined ? data.label.count + 1 : 1;
      }
      return data;
    });
    return this;
  }

  /**
   * Adds to the log count for log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
   */
  public static get count(): Log {
    return new this().count;
  }

  /**
   * Unsets the count for the log instances that share this log's label.
   *
   * This is a non-standard method.
   */
  public get countClear(): this {
    this.modifierQueue.push((data) => {
      if (data.label) {
        delete data.label.count;
      }
      return data;
    });
    return this;
  }

  /**
   * Unsets the count for the log instances that share this log's label.
   *
   * This is a non-standard method.
   */
  public static get countClear(): Log {
    return new this().countClear;
  }

  /**
   * Resets the count for the log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/countReset)
   */
  public get countReset(): this {
    this.modifierQueue.push((data) => {
      if (data.label) {
        data.label.count = 0;
      }
      return data;
    });
    return this;
  }

  /**
   * Resets the count for the log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/countReset)
   */
  public static get countReset(): Log {
    return new this().countReset;
  }

  /**
   * Instructs this log to print in the dir format. Typically this is useful
   * for rendering deeply nested objects in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
   */
  public get dir(): this {
    this.modifierQueue.push((data) => {
      data.method = 'dir';
      return data;
    });
    return this;
  }

  /**
   * Instructs this log to print in the dir format. Typically this is useful
   * for rendering deeply nested objects in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
   */
  public static get dir(): Log {
    return new this().dir;
  }

  /**
   * Instructs this log to print in the dirxml format. Typically this is useful
   * for rendering HTML/DOM or XML Elements in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml)
   */
  public get dirxml(): this {
    this.modifierQueue.push((data) => {
      data.method = 'dirxml';
      return data;
    });
    return this;
  }

  /**
   * Instructs this log to print in the dirxml format. Typically this is useful
   * for rendering HTML/DOM or XML Elements in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml)
   */
  public static get dirxml(): Log {
    return new this().dirxml;
  }

  /**
   * Instructs the log terminator to add the key/value pairs from the
   * thread context to the console output.
   *
   * This is a non-standard API.
   */
  public get dump(): this {
    this.modifierQueue.push((data) => {
      this._cfg.dump = true;
      return data;
    });
    return this;
  }

  /**
   * Instructs the log terminator to add the key/value pairs from the
   * thread context to the console output.
   *
   * This is a non-standard API.
   */
  public static get dump(): Log {
    return new this().dump;
  }

  /**
   * Instructs the logger to print according to the provided format.
   *
   * This is a non-standard API.
   */
  public format(format: Format): this {
    this.modifierQueue.push((data) => {
      this._cfg.format = format;
      return data;
    });
    return this;
  }

  /**
   * Instructs the logger to print according to the provided format.
   *
   * This is a non-standard API.
   */
  public static format(format: Format): Log {
    return new this().format(format);
  }

  /**
   * Starts a log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   */
  public get group(): this {
    this.modifierQueue.push((data) => {
      data.method = 'group';
      return data;
    });
    return this;
  }

  /**
   * Starts a log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   */
  public static get group(): Log {
    return new this().group;
  }

  /**
   * Starts a log group that is collapsed by default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
   */
  public get groupCollapsed(): this {
    this.modifierQueue.push((data) => {
      data.method = 'groupCollapsed';
      return data;
    });
    return this;
  }

  /**
   * Starts a log group that is collapsed by default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
   */
  public static get groupCollapsed(): Log {
    return new this().groupCollapsed;
  }

  /**
   * Ends the most recently opened log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)
   */
  public get groupEnd(): this {
    this.modifierQueue.push((data) => {
      data.method = 'groupEnd';
      return data;
    });
    return this;
  }

  /**
   * Ends the most recently opened log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)
   */
  public static get groupEnd(): Log {
    return new this().groupEnd;
  }

  /**
   * Generates a log message if the provided expression is truthy.
   *
   * This is a non-standard API.
   */
  public if(expression: boolean): this {
    this.modifierQueue.push((data) => {
      data.if = expression;
      return data;
    });
    return this;
  }

  /**
   * Generates a log message if the provided expression is truthy.
   *
   * This is a non-standard API.
   */
  public static if(expression: boolean): Log {
    return new this().if(expression);
  }

  /**
   * DEPRECATED: Use the equivalent `if` method instead.
   *
   * @deprecated
   */
  public test(expression: boolean): this {
    return this.if(expression);
  }

  /**
   * DEPRECATED: Use the equivalent `if` method instead.
   *
   * @deprecated
   */
  public static test(expression: boolean): Log {
    return new this().if(expression);
  }

  /**
   * Adds a label to the log. Label's can be used for log identification
   * and grouping. Label's also link log instances together.
   *
   * This is a non-standard API, but it replaces the need to provide
   * a label to methods that require a global identifier for tracking purposes.
   */
  public label(name: string): this {
    // prepend the modifier queue
    this.modifierQueue.unshift((data) => {
      const globalStore = getGlobalStore(this.globalContext);
      if (globalStore) {
        const label = globalStore.getLabel(name) ?? { name };
        data.label = label;
        globalStore.setLabel(name, label);
      }
      return data;
    });
    return this;
  }

  /**
   * Adds a label to the log. Label's can be used for log identification
   * and grouping. Label's also link log instances together.
   *
   * This is a non-standard API, but it replaces the need to provide
   * a label to methods that require a global identifier for tracking purposes.
   */
  public static label(name: string): Log {
    return new this().label(name);
  }

  /**
   * Assign meta data to this log instance that is meant to be
   * retrievable in a log listener or from a `log.data()` dump.
   *
   * This is a non-standard API.
   */
  public meta<T extends Record<string, unknown> = Record<string, unknown>>(meta: T): this {
    this.modifierQueue.push((data) => {
      data.meta = meta;
      return data;
    });
    return this;
  }

  /**
   * Assign meta data to this log instance that is meant to be
   * retrievable in a log listener or from a `log.data()` dump.
   *
   * This is a non-standard API.
   */
  public static meta<T extends Record<string, unknown> = Record<string, unknown>>(meta: T): Log {
    return new this().meta<T>(meta);
  }

  /**
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  public namespace(...namespace: string[]): this {
    this.modifierQueue.push((data) => {
      let arr = data.namespace ?? [];
      data.namespace = arr.length > 0 ? [...arr, ...namespace] : namespace;
      return data;
    });
    return this;
  }

  /**
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  public static namespace(...namespace: string[]): Log {
    return new this().namespace(...namespace);
  }

  /**
   * Alias for the `namespace` modifier.
   *
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  public ns(...namespace: N[]): this {
    return this.namespace(...namespace);
  }

  /**
   * Alias for the `namespace` modifier.
   *
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  public static ns(...namespace: string[]): Log {
    return new this().namespace(...namespace);
  }

  /**
   * This modifier prevents the log from printing. It can still be picked up by middleware or
   * listeners.
   */
  public get silent(): this {
    this.modifierQueue.push((data) => {
      this._cfg.silent = true;
      return data;
    });
    return this;
  }

  /**
   * This modifier prevents the log from printing. It can still be picked up by middleware or
   * listeners.
   */
  public static get silent(): Log {
    return new this().silent;
  }

  /**
   * Instructs this log to print its argument in a table format.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
   */
  public get table(): this {
    this.modifierQueue.push((data) => {
      data.method = 'table';
      return data;
    });
    return this;
  }

  /**
   * Instructs this log to print its argument in a table format.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
   */
  public static get table(): Log {
    return new this().table;
  }

  /**
   * Starts a timer associated with this log's *label*. This will do nothing if
   * this log has no label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/time).
   */
  public get time(): this {
    this.modifierQueue.push((data) => {
      const timeStart = hrtime();
      if (data.label) {
        data.label.timeStart = timeStart;
      }
      return data;
    });
    return this;
  }

  /**
   * Starts a timer associated with this log's *label*. This will do nothing if
   * this log has no label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/time).
   */
  public static get time(): Log {
    return new this().time;
  }

  /**
   * Stops a timer that was previously started by calling time() on a *labeled* log. Calculates the
   * difference between the start time and when this method was called. This then
   * modifies the log render to show the time difference. This will do nothing if the *label* does
   * not exist.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd).
   */
  public get timeEnd(): this {
    this.modifierQueue.push((data) => {
      if (data.label && data.label?.timeStart) {
        data.label.timeElapsed = formatTime(hrtime(data.label.timeStart));
      }
      return data;
    });
    return this;
  }

  /**
   * Stops a timer that was previously started by calling time() on a *labeled* log. Calculates the
   * difference between the start time and when this method was called. This then
   * modifies the log render to show the time difference. This will do nothing if the *label* does
   * not exist.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/timeEnd).
   */
  public static get timeEnd(): Log {
    return new this().timeEnd;
  }

  /**
   * Modifies the log render to show the current high-resolution real time.
   *
   * This is a non-standard method.
   */
  public get timeNow(): this {
    this.modifierQueue.push((data) => {
      data.timeNow = captureTimeNow();
      return data;
    });
    return this;
  }

  /**
   * Modifies the log render to show the current high-resolution real time.
   *
   * This is a non-standard method.
   */
  public static get timeNow(): Log {
    return new this().timeNow;
  }

  /**
   * This modifier method tells the log to render a timestamp.
   *
   * This is a non-standard API.
   */
  public get timestamp(): this {
    this.modifierQueue.push((data) => {
      this._cfg.showTimestamp = true;
      return data;
    });
    return this;
  }

  /**
   * This modifier method tells the log to render a timestamp.
   *
   * This is a non-standard API.
   */
  public static get timestamp(): Log {
    return new this().timestamp;
  }

  /**
   * Prints a stacktrace along with the log. This does not use the standard "trace" method but
   * derives the stacktrace from the current call stack and appends it to your log.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)
   */
  public get trace(): this {
    this.modifierQueue.push((data) => {
      data.stacktrace = stacktrace();
      return data;
    });
    return this;
  }

  /**
   * Prints a stacktrace along with the log. This does not use the standard "trace" method but
   * derives the stacktrace from the current call stack and appends it to your log.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)
   */
  public static get trace(): Log {
    return new this().trace;
  }

  /**
   * Allows emoji's to be printed in pretty logs.
   */
  public get withEmoji(): this {
    this.modifierQueue.push((data) => {
      this._cfg.withEmoji = true;
      return data;
    });
    return this;
  }

  /**
   * Allows emoji's to be printed in pretty logs.
   */
  public static get withEmoji() {
    return new this().withEmoji;
  }

  ////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////

  protected terminate(terminator: string, args: unknown[]): void {
    // Run the beforeTerminated middleware hooks
    this.doHook((m) => (m.beforeTerminated ? m.beforeTerminated(this, terminator, args) : null));

    // Get the level configuration based on the level name.
    const level = this.getLevelConfig(terminator);

    // Get the log formatter
    const formatterConstructor = this.selectFormatter(this._cfg.format);
    // Instantiate the formatter.
    const formatter = new formatterConstructor(this._cfg, level);
    // Generate the timestamp. Use the user configured formatter if it is set.
    const timestamp = formatter.timestampFormatter(new Date());

    // Run the modifier queue to modify the data object.
    this.runModifierQueue();

    // Create our final log data object
    const message = formatter.print(this.modifierData, timestamp, args);
    this.doHook((m) => (m.beforeFormatApplied ? m.beforeFormatApplied(this, message) : null));
    const data: LogData = {
      ...level,
      ...this._modifierData,
      terminator,
      args,
      timestamp,
      message,
    };
    this.doHook((m) => (m.afterFormatApplied ? m.afterFormatApplied(this, message) : null));

    // save the data to this instance
    this._data = data;

    this.doHook((m) => (m.beforePrint ? m.beforePrint(this) : null));

    // Don't print if the message is empty.
    if (data.message.length === 0) return;

    if (isMethodWithArgs(data.method)) {
      console[data.method](...data.message);
    } else {
      console[data.method]();
    }

    this.doHook((m) => (m.afterTerminated ? m.afterTerminated(this) : null));
  }

  /**
   * Returns a formatter constructor based on the provided format.
   */
  // TODO: Use the formatter from the global configuration if it is set.
  protected selectFormatter(format: string): FormatterConstructor {
    return this.cfg?.formatters[format];
  }

  /**
   * Merge the user configuration with the default configuration and the global configuration.
   */
  protected mergeConfiguration(cfg?: UserConfiguration): void {
    this._cfg = mergeConfiguration(this._cfg, cfg, this.globalContext?.$adzeGlobal?.configuration);
  }

  /**
   * Returns the level configuration object based on the provided level name.
   */
  protected getLevelConfig(levelName: string): LevelConfig {
    return this._cfg.levels[levelName];
  }

  /**
   * Adds a custom level to the log instance configuration.
   */
  protected customLevel(name: string, cfg: LevelConfig): void {
    this.mergeConfiguration({
      levels: {
        [name]: cfg,
      },
    });
  }

  /**
   * Runs the modifier queue against this instance.
   */
  private runModifierQueue(): void {
    this.modifierQueue.forEach((modifier) => {
      const result = modifier(this.modifierData);
      this.doHook((m) => (m.beforeModifierApplied ? m.beforeModifierApplied(this, result) : null));
      this._modifierData = result;
      this.doHook((m) => (m.afterModifierApplied ? m.afterModifierApplied(this, result) : null));
    });
  }

  /**
   * Execute a middleware hook.
   */
  private doHook(cb: (middleware: Middleware) => void): void {
    this._cfg.middleware?.forEach((middleware) => cb(middleware));
  }
}