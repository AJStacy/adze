import { afterEach, describe, expect, test, vi } from 'vitest';
import adze, { CommonLogFormatMeta, LevelConfig, setup, teardown } from '../../../src';
import { isMatch } from 'date-fns';

describe('terminators with common format', () => {
  afterEach(() => {
    teardown();
  });

  test('prints a log with level of alert', () => {
    console.error = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .alert('This is an alert log.');
    expect(console.error).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is an alert log.'
    );
  });

  test('prints a log with level of error', () => {
    console.error = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .error('This is an error log.');
    expect(console.error).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is an error log.'
    );
  });

  test('prints a log with level of warn', () => {
    console.warn = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .warn('This is a warn log.');
    expect(console.warn).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a warn log.'
    );
  });

  test('prints a log with level of info', () => {
    console.info = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .info('This is an info log.');
    expect(console.info).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is an info log.'
    );
  });

  test('prints a log with level of fail', () => {
    console.info = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .fail('This is a fail log.');
    expect(console.info).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a fail log.'
    );
  });

  test('prints a log with level of success', () => {
    console.info = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .success('This is a success log.');
    expect(console.info).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a success log.'
    );
  });

  test('prints a log with level of log', () => {
    console.log = vi.fn();
    setup({ format: 'common', timestampFormatter: () => '31/Jul/2024:12:38:35 -0400' });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .log('This is a log log.');
    expect(console.log).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a log log.'
    );
  });

  test('prints a log with level of debug', () => {
    console.debug = vi.fn();
    setup({
      activeLevel: 'debug',
      format: 'common',
      timestampFormatter: () => '31/Jul/2024:12:38:35 -0400',
    });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .debug('This is a debug log.');
    expect(console.debug).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a debug log.'
    );
  });

  test('prints a log with level of verbose', () => {
    console.debug = vi.fn();
    setup({
      activeLevel: 'verbose',
      format: 'common',
      timestampFormatter: () => '31/Jul/2024:12:38:35 -0400',
    });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .verbose('This is a verbose log.');
    expect(console.debug).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a verbose log.'
    );
  });

  test('prints a custom log', () => {
    console.log = vi.fn();
    const leetLevel: LevelConfig = {
      levelName: 'leetLevel',
      level: 1337,
      method: 'log',
      style:
        'font-size: 12px; border-radius: 4px; padding-right: 10px; background: linear-gradient(to right, #ffcafc, #ff02f2); color: #fff; border-color: #e3bbbb;',
      terminalStyle: ['white', 'bgMagenta'],
      emoji: '👾',
    };
    setup({
      activeLevel: 1337,
      levels: { leetLevel },
      format: 'common',
      timestampFormatter: () => '31/Jul/2024:12:38:35 -0400',
    });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .custom('leetLevel', 'This is a custom log.');
    expect(console.log).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is a custom log.'
    );
  });

  test('does not print an emoji', () => {
    console.error = vi.fn();
    setup({
      format: 'common',
      timestampFormatter: () => '31/Jul/2024:12:38:35 -0400',
    });
    adze.withEmoji
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .alert('This is an alert log.');
    expect(console.error).toHaveBeenCalledWith(
      'localhost 12345 group-user [31/Jul/2024:12:38:35 -0400] This is an alert log.'
    );
  });

  test('default timestamp matches dd/MMM/yyyy:HH:mm:ss xx', () => {
    const fn = vi.fn();
    console.error = fn;
    setup({
      format: 'common',
    });
    adze
      .meta<CommonLogFormatMeta>({
        hostname: 'localhost',
        ident: '12345',
        user: 'group-user',
      })
      .alert('This is an alert log.');
    expect(console.error).toHaveBeenCalledTimes(1);
    const message = fn.mock.calls[0][0];
    const timestamp = message.split('[')[1].split(']')[0];
    expect(isMatch(timestamp, 'dd/MMM/yyyy:HH:mm:ss xx')).toBe(true);
  });
});
