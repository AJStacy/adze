import { Label } from '../label';
import { Defaults, Configuration, LogRender, LogData } from '.';
import { FinalLogData } from './Log';

export type LabelMap = Map<string, Label>;

export type ListenerLocations = Array<[number, number]>;

export type ListenerBuckets = Map<number, ListenerBucket>;

export type ListenerBucket = Map<number, ListenerCallback>;

export type ListenerCallback = (
  LogData: LogData | FinalLogData,
  render: LogRender | null,
  printed: boolean
) => void;

export interface ShedConfig {
  cacheLimit: number;
  globalCfg: Defaults | null;
}

export interface ShedUserConfig extends Partial<Omit<ShedConfig, 'globalCfg'>> {
  globalCfg?: Configuration | null;
}

export interface LabelData {
  name: string;
  timeElapsed: string | null;
  count: number | null;
}
