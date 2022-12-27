import { LogRender, FinalLogData, FinalLabeledLogData } from '../_contracts';
import { Env } from '../env';
import { BrowserPrinter } from './browser-printer';
import { NodePrinter } from './node-printer';
import { MachinePrinter } from './machine-printer';
import { isFinalLabeledLogData } from '../util';

export type PrinterMethods =
  | 'printLog'
  | 'printGroup'
  | 'printGroupCollapsed'
  | 'printGroupEnd'
  | 'printTrace'
  | 'printTable'
  | 'printDir'
  | 'printDirxml';

export class Printer {
  private env: Env = new Env();

  private printer: BrowserPrinter | NodePrinter | MachinePrinter;

  private data: FinalLogData | FinalLabeledLogData;

  constructor(data: FinalLogData | FinalLabeledLogData) {
    this.data = data;
    this.printer = this.resolvePrinter();
  }

  /**
   * Determine the Printer to use based upon configuration and environment.
   */
  private resolvePrinter(): BrowserPrinter | NodePrinter | MachinePrinter {
    if (this.data.cfg.machineReadable) {
      return new MachinePrinter(this.data);
    } else if (this.env.isBrowser) {
      return new BrowserPrinter(this.data);
    }
    return new NodePrinter(this.data);
  }

  get args(): unknown[] {
    return this.data.args ?? [];
  }

  // ------- PRINT METHODS -------- //

  public printLog(): LogRender | null {
    return this.attachContext(this.printer.printLog());
  }

  public printGroup(): LogRender | null {
    return this.attachContext(this.printer.printGroup());
  }

  public printGroupCollapsed(): LogRender | null {
    return this.attachContext(this.printer.printGroupCollapsed());
  }

  public printTrace(): LogRender | null {
    return this.attachContext(this.printer.printTrace());
  }

  public printGroupEnd(): LogRender | null {
    return this.attachContext(this.printer.printGroupEnd());
  }

  public printTable(): LogRender | null {
    return this.attachContext(this.printer.printTable());
  }

  public printDir(): LogRender | null {
    return this.attachContext(this.printer.printDir());
  }

  public printDirxml(): LogRender | null {
    return this.attachContext(this.printer.printDirxml());
  }

  // =======================
  //  Private Methods
  // =======================

  /**
   * Attaches context values to the arguments of the log render if the
   * dump modifier was used.
   */
  private attachContext(render: LogRender | null): LogRender | null {
    if (isFinalLabeledLogData(this.data)) {
      if (render && this.data.dumpContext && !this.data.cfg.machineReadable) {
        return [render[0], [...render[1], this.data.context]];
      }
    }
    return render;
  }
}
