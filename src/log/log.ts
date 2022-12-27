import {
  Configuration,
  Constraints,
  Defaults,
  LogRender,
  LogTimestamp,
  MetaData,
  LogLevelDefinition,
  PrintMethod,
  LogData,
  FinalLogData,
  TerminatedLog,
} from '../_contracts';
import {
  isString,
  stacktrace,
  timestamp,
  toConsole,
  isFinalLogData,
  shedExists,
  defaultsDeep,
  cloneDeep,
  captureTimeNow,
} from '../util';
import { defaults } from '../_defaults';
import { Env } from '../env';
import { Printer } from '../printers';
import { allowed, parseFilterLevels } from '../conditions';
import { LabeledLog } from '.';
import { addLabel, getLabel, Label } from '../label';

export class Log<C extends Constraints> {
  /**
   * The Printer class constructor.
   */
  protected Printer: typeof Printer;

  /**
   * Instance of the Env class.
   */
  protected env: Env = new Env();

  /**
   * The Adze log configuration merged with defaults.
   */
  protected cfg: Defaults;

  /**
   * The level of this log instance.
   */
  protected _level: number | null = null;

  /**
   * The log level definition selected for this log
   * after it has been terminated.
   */
  protected definition: LogLevelDefinition | null = null;

  /**
   * Arguments passed into a terminating method.
   */
  protected args: unknown[] | null = null;

  /**
   * The log render after this log has been terminated.
   */
  protected _render: LogRender | null = null;

  /**
   * The timestamp object generated when this log has been terminated.
   */
  protected _timestamp: LogTimestamp | null = null;

  /**
   * The stacktrace of the log when it has been terminated.
   */
  protected stacktrace: string | null = null;

  /**
   * The namespaces assigned to this log.
   */
  protected _namespaceVal: C['allowedNamespaces'][] | null = null;

  /**
   * The time elapsed when this log was terminated.
   */
  protected timeNowVal: string | null = null;

  /**
   * The function used to generate a log render when
   * the log is terminated.
   */
  protected printer: PrintMethod = 'printLog';

  /**
   * Meta data attached to this log instance through the
   * meta modifier. This is retrievable in log listeners.
   */
  protected metaData: MetaData = {};

  // ======================================
  //   Flags
  // ======================================

  /**
   * The result of the expression evaluated from
   * the assertion modifier. If this value is false,
   * the log will print the provided message denoting
   * the failure of the assertion.
   */
  protected assertion: boolean | undefined;

  /**
   * The result of the expression evaluated from
   * the assertion modifier. If this value is false,
   * the log will print the provided message denoting
   * the failure of the assertion.
   */
  protected expression: boolean | undefined;

  /**
   * Flag which tells the log instance to skip rendering.
   */
  protected isSilent = false;

  /**
   * Flag which indicates if the log is allowed to print to the console.
   */
  protected printed = false;

  /**
   * Flag which tells the log instance to render the
   * timestamp.
   */
  protected showTimestamp = false;

  constructor(printer: typeof Printer, env: Env, user_cfg?: Configuration) {
    this.Printer = printer;
    this.env = env;

    // First merge our user config with our defaults
    const cfg = user_cfg ? (defaultsDeep(user_cfg, defaults) as Defaults) : defaults;

    // Now check if global overrides exist and apply them over top of our configuration
    const shed = env.global.$shed;
    const with_overrides =
      shedExists(shed) && shed.hasOverrides ? (defaultsDeep(shed.overrides, cfg) as Defaults) : cfg;

    // Now we'll pre-parse our filter levels in the config for performance
    this.cfg = parseFilterLevels(with_overrides);

    // Apply our global meta data to the log
    if (this.cfg.meta) {
      this.metaData = this.cfg.meta;
    }
  }

  /**
   * Getter for retrieving the level from the instance.
   */
  public get level(): number | null {
    return this._level;
  }

  /**
   * Getter for retrieving the log render from the instance.
   */
  public get render(): LogRender | null {
    return this._render;
  }

  // ======================================
  //   Terminating Methods (return void)
  // ======================================

  /**
   * Terminates the log at the *alert* level.
   *
   * **Default Level = 0**
   *
   * This level is useful for calling alert to
   * important information and lives at the lowest level.
   *
   * You should use this sparingly since it's level is lower
   * than error.
   *
   * This is a non-standard API.
   */
  public alert(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('alert', args);
  }

  /**
   * Terminates the log at the *error* level.
   *
   * **Default Level = 1**
   *
   * Use this for logging fatal errors or errors that
   * impact functionality of your application.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/error)
   */
  public error(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('error', args);
  }

  /**
   * Terminates the log at the *warning* level.
   *
   * **Default Level = 2**
   *
   * Use this for logging issues that may impact
   * app performance in a less impactful way than
   * an error.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/warn)
   */
  public warn(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('warn', args);
  }

  /**
   * Terminates the log at the *info* level.
   *
   * **Default Level = 3**
   *
   * Use this for logging general insights into your
   * application. This level does not indicate any
   * problems.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/info)
   */
  public info(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('info', args);
  }

  /**
   * Terminates the log at the *fail* level.
   *
   * **Default Level = 4**
   *
   * Use this for logging network communication errors
   * that do not break your application.
   *
   * This is a non-standard API.
   */
  public fail(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('fail', args);
  }

  /**
   * Terminates the log at the *success* level.
   *
   * **Default Level = 5**
   *
   * Use this for logging successful network communication.
   *
   * This is a non-standard API.
   */
  public success(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('success', args);
  }

  /**
   * Terminates the log at the *log* level.
   *
   * **Default Level = 6**
   *
   * Use this for general logging that doesn't apply
   * to any of the lower levels.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/log)
   */
  public log(...args: unknown[]): TerminatedLog<C, this> {
    // console.log('MODIFIER QUEUE', this.modifierQueue);
    return this.logMethod('log', args);
  }

  /**
   * Terminates the log at the *debug* level.
   *
   * **Default Level = 7**
   *
   * Use this for logging information that you typically
   * do not want to see unless you are debugging a problem
   * with your application. This is typically hidden by
   * default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/debug)
   */
  public debug(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('debug', args);
  }

  /**
   * Terminates the log at the *verbose* level.
   *
   * **Default Level = 8**
   *
   * Use this for logging extremely detailed debugging
   * information. Use this level when the values you are
   * logging are granular enough that they are no longer
   * easily human readable.
   *
   * This is a non-standard API.
   */
  public verbose(...args: unknown[]): TerminatedLog<C, this> {
    return this.logMethod('verbose', args);
  }

  /**
   * Terminates the log at the provided custom log level.
   *
   * Custom log levels are defined within the Adze configuration object
   * under the `custom_levels` property.
   *
   * This is a non-standard API.
   */
  public custom(level_name: string, ...args: unknown[]): TerminatedLog<C, this> {
    return this.customMethod(level_name, args);
  }

  /**
   * Alias for console.clear().
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/clear)
   */
  public clear(): void {
    console.clear();
  }

  /**
   * Alias for clear() which is an alias for console.clear().
   *
   * This is a non-standard API.
   */
  public clr(): void {
    this.clear();
  }

  /**
   * Seals the configuration of a log and returns a function that
   * constructs a new log with the same configuration.
   *
   * **Example:**
   * ```javascript
   * const sealed = adze({ use_emoji: true }).ns('sealed').label('sealed-label').seal();
   * sealed().success('Success!'); // -> prints "#sealed [sealed-label] Success!"
   * sealed().log('Another log.'); // -> prints "#sealed [sealed-label] Another log."
   * ```
   */
  public seal(): () => Log<C> {
    return () => new Log<C>(this.Printer, this.env).hydrate(this.data);
  }

  // =============================
  //   MODIFIERS
  // =============================

  /**
   * Assign meta data to this log instance that is meant to be
   * retrievable in a log listener or from a `log.data()` dump.
   *
   * This is a non-standard API.
   */
  public meta<T>(key: string, val: T): this;
  public meta<KV extends [string, any]>(...[key, val]: KV): this;
  public meta(key: string, val: unknown): this {
    this.metaData[key] = val;
    return this;
  }

  /**
   * Instructs this log to print in the dir format. Typically this is useful
   * for rendering deeply nested objects in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dir)
   */
  public get dir(): this {
    this.printer = 'printDir';
    return this;
  }

  /**
   * Instructs this log to print in the dirxml format. Typically this is useful
   * for rendering HTML/DOM or XML Elements in the console.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/dirxml)
   */
  public get dirxml(): this {
    this.printer = 'printDirxml';
    return this;
  }

  /**
   * Instructs this log to print its argument in a table format.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
   */
  public get table(): this {
    this.printer = 'printTable';
    return this;
  }

  /**
   * This modifier method allows the log to execute normally but
   * prevent it from printing to the console.
   */
  public get silent(): this {
    this.isSilent = true;
    return this;
  }

  /**
   * Starts a log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/group)
   */
  public get group(): this {
    this.printer = 'printGroup';
    return this;
  }

  /**
   * Starts a log group that is collapsed by default.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupCollapsed)
   */
  public get groupCollapsed(): this {
    this.printer = 'printGroupCollapsed';
    return this;
  }

  /**
   * Ends the most recently opened log group.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd)
   */
  public get groupEnd(): this {
    this.printer = 'printGroupEnd';
    return this;
  }

  /**
   * Adds a label to the log. Label's can be used for log identification
   * and grouping. Label's also link log instances together.
   *
   * This is a non-standard API, but it replaces the need to provide
   * a label to `count` or `time`.
   */
  public label(name: string): LabeledLog<C> {
    const label = addLabel(getLabel(name) ?? new Label(name));
    return new LabeledLog<C>(this.Printer, this.env, this.cfg, label);
  }

  /**
   * Adds a namespace to the log. Namespace's are primarily useful
   * for grouping logs together. Multiple calls to namespace are
   * additive in nature.
   *
   * This is a non-standard API.
   */
  public namespace(ns: C['allowedNamespaces'][]): this;
  public namespace(...rest: C['allowedNamespaces'][]): this;
  public namespace(
    ns: C['allowedNamespaces'] | C['allowedNamespaces'][],
    ...rest: C['allowedNamespaces'][]
  ): this {
    const namespace = isString(ns) ? [ns, ...rest] : ns;
    this._namespaceVal = [...(this._namespaceVal ?? []), ...namespace];
    return this;
  }

  /**
   * An alias for `namespace()`.
   *
   * This is a non-standard API.
   */
  public ns(ns: C['allowedNamespaces'][]): this;
  public ns(...rest: C['allowedNamespaces'][]): this;
  public ns(
    ns: C['allowedNamespaces'] | C['allowedNamespaces'][],
    ...rest: C['allowedNamespaces'][]
  ): this {
    return this.namespace(ns as string, ...rest);
  }

  /**
   * Prints a stacktrace along with the log.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/trace)
   */
  public get trace(): this {
    this.printer = 'printTrace';
    return this;
  }

  /**
   * Prints a log warning that the assertion failed if the assertion is false.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/console/assert)
   */
  public assert(assertion: boolean): this {
    this.assertion = assertion;
    return this;
  }

  /**
   * Allows the log to print if the expression is true.
   *
   * This is a non-standard method.
   */
  public test(expression: boolean): this {
    this.expression = expression;
    return this;
  }

  /**
   * Modifies the log render to show the current high-resolution real time.
   *
   * This is a non-standard method.
   */
  public get timeNow(): this {
    this.timeNowVal = captureTimeNow();
    return this;
  }

  /**
   * This modifier method tells the log to render a timestamp.
   *
   * This is a non-standard API.
   */
  public get timestamp(): this {
    this.showTimestamp = true;
    return this;
  }

  // ===================================
  //   Private Methods for Terminators
  // ===================================

  /**
   * Generates a terminating log method the specified log level name.
   */
  private logMethod(levelName: string, args: unknown[]): TerminatedLog<C, this> {
    return this.terminate(this.getDefinition('logLevels', levelName), args);
  }

  /**
   * Generates a terminating log method that enables the user to specify a custom
   * log level by key as the format for the log.
   */
  private customMethod(lvlName: string, args: unknown[]): TerminatedLog<C, this> {
    return this.terminate(this.getDefinition('customLevels', lvlName), args);
  }

  /**
   * Gets the log level definition from the log configuration.
   */
  private getDefinition(
    type: 'logLevels' | 'customLevels',
    levelName: string
  ): LogLevelDefinition | undefined {
    const definition = this.cfg[type][levelName];
    return definition ? { ...definition, levelName } : undefined;
  }

  /**
   * The primary logic for terminating log methods.
   */
  private terminate(def: LogLevelDefinition | undefined, args: unknown[]): TerminatedLog<C, this> {
    if (def) {
      // Save values to this log instance for later recall
      this.args = args;
      this._level = def.level;
      this.definition = def;
      this._timestamp = timestamp();
      this.stacktrace = this.cfg.captureStacktrace ? stacktrace() : null;

      // Set this log data to a variable for type checking
      const log_data = this.data;

      if (isFinalLogData(log_data)) {
        // Render the log
        this._render = new Printer(log_data)[this.printer]();

        // Evaluates if this log can print
        this.printed = allowed(log_data) && this.evalPasses();

        // Attempt to print the render to the console / terminal
        if (this.printed) {
          toConsole(this._render);
        }

        // Cache the log
        this.store();

        // Fire the log listeners
        this.fireListeners(log_data, this._render, this.printed);

        // Return the terminated log object with a render
        return { log: this, render: this._render, printed: this.printed };
      }
    }

    // Return the terminated log object unrendered
    return { log: this, render: null, printed: false };
  }

  /**
   * Check if any assertions or expressions pass for this log to terminate.
   */
  private evalPasses(): boolean {
    if (this.assertion !== undefined && this.expression !== undefined) {
      console.warn(
        'You have declared both an assertion and test on the same log. Please only declare one or nefarious results may occur.'
      );
      return true;
    }
    if (this.assertion !== undefined) {
      return this.assertion === false;
    }
    if (this.expression !== undefined) {
      return this.expression === true;
    }
    return true;
  }

  // ===================================
  //   Log Events
  // ===================================

  /**
   * Stores this log in the Shed if the Shed exists.
   */
  private store(): void {
    const shed = this.env.global.$shed;
    if (shedExists(shed)) {
      shed.store(this);
    }
  }

  /**
   * Fires listeners for this log instance if a Shed exists.
   */
  private fireListeners(data: FinalLogData, render: LogRender | null, printed: boolean): void {
    const shed = this.env.global.$shed;
    if (shedExists(shed)) {
      shed.fireListeners(data, render, printed);
    }
  }

  // ===================================
  //   Generate Log Data
  // ===================================

  /**
   * Creates a slimmed down object comprised of data from a log.
   */
  public get data(): LogData | FinalLogData {
    const values: LogData = {
      cfg: cloneDeep(this.cfg),
      level: this._level,
      definition: this.definition ? { ...this.definition } : null,
      args: this.args ? [...this.args] : null,
      timestamp: this._timestamp ? { ...this._timestamp } : null,
      stacktrace: this.stacktrace,
      namespace: this._namespaceVal ? [...this._namespaceVal] : null,
      assertion: this.assertion,
      expression: this.expression,
      isSilent: this.isSilent,
      printed: this.printed,
      showTimestamp: this.showTimestamp,
      timeNow: this.timeNowVal,
      meta: { ...this.metaData },
    };
    return values;
  }

  /**
   * Hydrate this log's properties from a log data object.
   */
  public hydrate(data: LogData | FinalLogData): this {
    this.cfg = cloneDeep(data.cfg);
    this._level = data.level;
    this.definition = data.definition ? { ...data.definition } : null;
    this.args = data.args ? [...data.args] : null;
    this._timestamp = data.timestamp ? { ...data.timestamp } : null;
    this.stacktrace = data.stacktrace;
    this._namespaceVal = data.namespace ? [...data.namespace] : null;
    this.assertion = data.assertion;
    this.expression = data.expression;
    this.isSilent = data.isSilent;
    this.printed = data.printed;
    this.showTimestamp = data.showTimestamp;
    this.timeNowVal = data.timeNow;
    this.metaData = { ...data.meta };

    return this;
  }
}
