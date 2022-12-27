import { FinalLabeledLogData, FinalLogData } from '../_contracts';
import { Env } from '../env';
import { isString } from '../util';

export class SharedPrinter {
  protected env: Env = new Env();

  protected data: FinalLogData | FinalLabeledLogData;

  constructor(data: FinalLogData | FinalLabeledLogData) {
    this.data = data;
  }

  get use_emoji(): boolean {
    return (
      (this.env.global.$shed?.overrides?.useEmoji === true &&
        !this.env.global.$shed?.overrides?.unstyled === false) ||
      (this.data.cfg.useEmoji === true && this.data.cfg.unstyled === false)
    );
  }

  get unstyled(): boolean {
    return this.data.cfg.unstyled;
  }

  /**
   * Returns a UTC formatted timestamp.
   *
   * Example: 2002-10-10T12:00:00−05:00
   */
  get timestamp(): string {
    return this.data.showTimestamp ? `${this.data.timestamp.iso8601}  ` : '';
  }

  // ------ Shared Formatters ------- //

  /**
   * Formats the namespace on the log string based on the namespace
   * modifier applied to this log.
   */
  protected fNamespace(): string {
    const ns = this.data.namespace;
    if (ns) {
      if (isString(ns)) {
        return `#${ns} `;
      } else {
        return ns.reduce((acc, name) => `${acc}#${name} `, '');
      }
    }
    return '';
  }
}
