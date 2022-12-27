import { Log } from './log';
import {
  Constraints,
  Defaults,
  FinalLabeledLogData,
  LabeledLogData,
  MetaData,
} from '../_contracts';
import { cloneDeep } from '../util';
import { Printer } from '../printers';
import { Env } from '../env';
import { Label } from '../label';

export class LabeledLog<C extends Constraints> extends Log<C> {
  /**
   * The label instance assigned to this log.
   */
  protected _labelVal: Label;

  /**
   * Flag which tells the log instance to add the
   * MDC context to the log render arguments.
   */
  protected dumpContext = false;

  /**
   * Instructs the log terminator to add the key/value pairs from the
   * thread context to the console output.
   *
   * This is a non-standard API.
   */
  public get dump(): this {
    this.dumpContext = true;
    return this;
  }

  constructor(printer: typeof Printer, env: Env, cfg: Defaults, label: Label) {
    super(printer, env, cfg);
    this._labelVal = label;
  }

  /**
   * Getter shortcut for retrieving MDC context from the log instance.
   */
  public get context(): MetaData {
    return this._labelVal?.getContext() ?? {};
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
  public seal(): () => LabeledLog<C> {
    return () =>
      new LabeledLog<C>(this.Printer, this.env, this.cfg, this._labelVal).hydrate(this.data);
  }

  /**
   * Following the MDC (Mapped Diagnostic Context) pattern this method enables you to create
   * a thread for adding context from different scopes before finally terminating the log.
   *
   * In order to create a thread, this log must specify a label that will be used to link the
   * context and your environment must have a **shed** created.
   *
   * **Example:**
   * ```typescript
   * import { adze, createShed } from 'adze';
   *
   * const shed = createShed();
   *
   * // Creating a shed listener is a great way to get meta data from your
   * // threaded logs to write to disk or pass to another plugin, library,
   * // or service.
   * shed.addListener([1,2,3,4,5,6,7,8], (log) => {
   *   // Do something with `log.context.added` or `log.context.subtracted`.
   * });
   *
   * function add(a, b) {
   *   const answer = a + b;
   *   adze().label('foo').thread('added', { a, b, answer });
   *   return answer;
   * }
   *
   * function subtract(x, y) {
   *   const answer = x - y;
   *   adze().label('foo').thread('subtracted', { x, y, answer });
   *   return answer;
   * }
   *
   * add(1, 2);
   * subtract(4, 3);
   *
   * adze().label('foo').dump.info('Results from our thread');
   * // Info => Results from our thread, { a: 1, b: 2, answer: 3 }, { x: 4, y: 3, answer: 1 }
   *
   * ```
   *
   * This is a non-standard API.
   */
  public thread<T>(key: string, value: T): void {
    // Check if the log has a label. If not, console.warn the user.
    // If the log has a label, attach the context to the label.
    if (this._labelVal) {
      this._labelVal.addContext(key, value);
    } else {
      console.warn('Thread context was not added! Threads must have a label.');
    }
  }

  /**
   * Closes a thread assigned to the log by clearing the context values.
   *
   * This is a non-standard API.
   */
  public close(): void {
    if (this._labelVal) {
      this._labelVal.clearContext();
    }
  }

  /**
   * Adds to the log count for log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/count)
   */
  public get count(): this {
    if (this._labelVal) {
      console.log('labelVal', this._labelVal);
      this._labelVal.addCount();
    }
    return this;
  }

  /**
   * Resets the count for the log instances that share this log's label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/countReset)
   */
  public get countReset(): this {
    if (this._labelVal) {
      this._labelVal.resetCount();
    }
    return this;
  }

  /**
   * Unsets the count for the log instances that share this log's label.
   *
   * This is a non-standard method.
   */
  public get countClear(): this {
    if (this._labelVal) {
      this._labelVal.clearCount();
    }
    return this;
  }

  /**
   * Starts a timer associated with this log's *label*. This will do nothing if
   * this log has no label.
   *
   * MDN API Docs [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/time).
   */
  public get time(): this {
    if (this._labelVal) {
      this._labelVal.startTime();
    }
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
  public get timeEnd(): this {
    if (this._labelVal) {
      this._labelVal.endTime();
    }
    return this;
  }

  /*
    ! console.timeLog() is purposefully omitted from this API.

    timeLog() is a useless method within the Adze API. The same effect can be 
    accomplished by created a new log with the same label.
  */

  /**
   * Creates a slimmed down object comprised of data from a log.
   */
  public get data(): LabeledLogData | FinalLabeledLogData {
    const values: LabeledLogData = {
      cfg: cloneDeep(this.cfg),
      level: this._level,
      definition: this.definition ? { ...this.definition } : null,
      args: this.args ? [...this.args] : null,
      timestamp: this._timestamp ? { ...this._timestamp } : null,
      stacktrace: this.stacktrace,
      namespace: this._namespaceVal ? [...this._namespaceVal] : null,
      label: {
        name: this._labelVal.name,
        timeElapsed: this._labelVal.timeElapsed ?? null,
        count: this._labelVal.count ?? null,
      },
      assertion: this.assertion,
      expression: this.expression,
      dumpContext: this.dumpContext,
      isSilent: this.isSilent,
      printed: this.printed,
      showTimestamp: this.showTimestamp,
      timeNow: this.timeNowVal,
      meta: { ...this.metaData },
      context: { ...this.context },
    };
    return values;
  }

  /**
   * Hydrate this log's properties from a log data object.
   */
  public hydrate(data: LabeledLogData | FinalLabeledLogData): this {
    this.cfg = cloneDeep(data.cfg);
    this._level = data.level;
    this.definition = data.definition ? { ...data.definition } : null;
    this.args = data.args ? [...data.args] : null;
    this._timestamp = data.timestamp ? { ...data.timestamp } : null;
    this.stacktrace = data.stacktrace;
    this._namespaceVal = data.namespace ? [...data.namespace] : null;
    // this._labelVal = this.resolveLabel(data);
    this.assertion = data.assertion;
    this.expression = data.expression;
    this.dumpContext = data.dumpContext;
    this.isSilent = data.isSilent;
    this.printed = data.printed;
    this.showTimestamp = data.showTimestamp;
    this.timeNowVal = data.timeNow;
    this.metaData = { ...data.meta };

    return this;
  }

  /**
   * Returns the label from the store if it exists by the given name.
   * If it's not in the store, generate a new label with the provided data
   * properties.
   */
  // private resolveLabel(data: LabeledLogData | FinalLabeledLogData): Label {
  //   const stored_label = getLabel(data.label.name);
  //   if (stored_label) {
  //     return stored_label;
  //   }
  //   return new Label(data.label.name, data.context, data.label.count, data.label.timeElapsed);
  // }
}
