import {
  Filters,
  FormatterConstructor,
  Configuration as IConfiguration,
  Level,
  LevelConfiguration,
  TimestampFormatter,
  UserConfiguration,
} from './_types';
import { defaultConfiguration as dfltCfg } from './constants';
import { Middleware } from './middleware';

/**
 * This class is a proxy for getting configuration in the correct hierarchical order.
 */
export class Configuration implements IConfiguration {
  /**
   * The log defined configuration.
   */
  private logCfg: UserConfiguration;

  /**
   * Reference to the global store configuration overrides.
   */
  private glblCfg?: UserConfiguration;

  constructor(logCfg?: UserConfiguration) {
    this.logCfg = logCfg ?? {};
    this.glblCfg = globalThis.$adzeGlobal?.configuration;
  }

  public get activeLevel(): Level | number {
    return this.glblCfg?.activeLevel ?? this.logCfg?.activeLevel ?? dfltCfg.activeLevel;
  }

  public set activeLevel(level: Level | number) {
    this.logCfg.activeLevel = level;
  }

  public get cache(): boolean {
    return this.glblCfg?.cache ?? this.logCfg?.cache ?? dfltCfg.cache;
  }

  public set cache(value: boolean) {
    this.logCfg.cache = value;
  }

  public get cacheSize(): number {
    return this.glblCfg?.cacheSize ?? this.logCfg?.cacheSize ?? dfltCfg.cacheSize;
  }

  public set cacheSize(size: number) {
    this.logCfg.cacheSize = size;
  }

  public get dump(): boolean {
    return this.glblCfg?.dump ?? this.logCfg?.dump ?? dfltCfg.dump;
  }

  public set dump(value: boolean) {
    this.logCfg.dump = value;
  }

  public get meta(): Record<string, any> {
    return { ...this.logCfg?.meta, ...this.glblCfg?.meta };
  }

  public set meta(value: Record<string, any>) {
    this.logCfg.meta = value;
  }

  public get silent(): boolean {
    return this.glblCfg?.silent ?? this.logCfg?.silent ?? dfltCfg.silent;
  }

  public set silent(value: boolean) {
    this.logCfg.silent = value;
  }

  public get showTimestamp(): boolean {
    return this.glblCfg?.showTimestamp ?? this.logCfg?.showTimestamp ?? dfltCfg.showTimestamp;
  }

  public set showTimestamp(value: boolean) {
    this.logCfg.showTimestamp = value;
  }

  public get withEmoji(): boolean {
    return this.glblCfg?.withEmoji ?? this.logCfg?.withEmoji ?? dfltCfg.withEmoji;
  }

  public set withEmoji(value: boolean) {
    this.logCfg.withEmoji = value;
  }

  public get format(): string {
    return this.glblCfg?.format ?? this.logCfg?.format ?? dfltCfg.format;
  }

  public set format(value: string) {
    this.logCfg.format = value;
  }

  public get levels(): Record<string, LevelConfiguration> {
    return { ...dfltCfg.levels, ...(this.logCfg?.levels ?? {}), ...(this.glblCfg?.levels ?? {}) };
  }

  public set levels(value: Record<string, LevelConfiguration>) {
    this.logCfg.levels = value;
  }

  public get middleware(): Middleware[] | undefined {
    return [...(this.glblCfg?.middleware ?? []), ...(this.logCfg?.middleware ?? [])];
  }

  public set middleware(value: Middleware[] | undefined) {
    this.logCfg.middleware = value;
  }

  public get filters(): Filters | undefined {
    return this.glblCfg?.filters ?? this.logCfg?.filters;
  }

  public set filters(value: Filters | undefined) {
    this.logCfg.filters = value;
  }

  public get timestampFormatter(): TimestampFormatter | undefined {
    return this.glblCfg?.timestampFormatter ?? this.logCfg?.timestampFormatter;
  }

  public set timestampFormatter(value: TimestampFormatter | undefined) {
    this.logCfg.timestampFormatter = value;
  }

  public get formatters(): Record<string, FormatterConstructor> {
    return {
      ...dfltCfg.formatters,
      ...(this.logCfg?.formatters ?? {}),
      ...(this.glblCfg?.formatters ?? {}),
    };
  }

  public set formatters(value: Record<string, FormatterConstructor>) {
    this.logCfg.formatters = value;
  }

  public exportValues(): UserConfiguration {
    return {
      activeLevel: this.activeLevel,
      cache: this.cache,
      cacheSize: this.cacheSize,
      dump: this.dump,
      meta: this.meta,
      silent: this.silent,
      showTimestamp: this.showTimestamp,
      withEmoji: this.withEmoji,
      format: this.format,
      levels: this.levels,
      middleware: this.middleware,
      filters: this.filters,
      timestampFormatter: this.timestampFormatter,
      formatters: this.formatters,
    };
  }
}
