// eslint-disable-next-line @typescript-eslint/no-var-requires
const browserEnv = require('browser-env');
import test from 'ava';
import adze from '../../../src';

// Simulate the browser environment for testing
browserEnv();
// Our global context is the window not global
window.ADZE_ENV = 'dev';

test('label prints correctly', (t) => {
  const { log, render } = adze().label('test').log('This log has a label.');

  t.truthy(log);
  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args.length, 1);

    const parsed = JSON.parse(args[0] as string);
    t.is(parsed.method, 'log');
    t.is(parsed.level, 6);
    t.is(parsed.levelName, 'log');
    t.is(parsed.label, 'test');
    t.is(parsed.args.length, 1);
    t.is(parsed.args[0], 'This log has a label.');
  } else {
    t.fail();
  }
});

test('log with single namespace prints correctly', (t) => {
  const { log, render } = adze().ns('test').log('This log has a namespace.');

  t.truthy(log);
  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args.length, 1);

    const parsed = JSON.parse(args[0] as string);
    t.is(parsed.method, 'log');
    t.is(parsed.level, 6);
    t.is(parsed.levelName, 'log');
    t.is(parsed.namespace.length, 1);
    t.is(parsed.namespace[0], 'test');
    t.is(parsed.args.length, 1);
    t.is(parsed.args[0], 'This log has a namespace.');
  } else {
    t.fail();
  }
});

test('log with multiple namespaces prints correctly', (t) => {
  const { log, render } = adze().ns(['test', 'test2']).log('This log has multiple namespaces.');

  t.truthy(log);
  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args.length, 1);

    const parsed = JSON.parse(args[0] as string);
    t.is(parsed.method, 'log');
    t.is(parsed.level, 6);
    t.is(parsed.levelName, 'log');
    t.is(parsed.namespace.length, 2);
    t.is(parsed.namespace[0], 'test');
    t.is(parsed.namespace[1], 'test2');
    t.is(parsed.args.length, 1);
    t.is(parsed.args[0], 'This log has multiple namespaces.');
  } else {
    t.fail();
  }
});

test('log with multiple namespaces using rest parameters prints correctly', (t) => {
  const { log, render } = adze().ns('test', 'test2').log('This log has multiple namespaces.');

  t.truthy(log);
  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args.length, 1);

    const parsed = JSON.parse(args[0] as string);
    t.is(parsed.method, 'log');
    t.is(parsed.level, 6);
    t.is(parsed.levelName, 'log');
    t.is(parsed.namespace.length, 2);
    t.is(parsed.namespace[0], 'test');
    t.is(parsed.namespace[1], 'test2');
    t.is(parsed.args.length, 1);
    t.is(parsed.args[0], 'This log has multiple namespaces.');
  } else {
    t.fail();
  }
});

test('multiple calls to namespace are additive', (t) => {
  const { log, render } = adze()
    .ns('foo', 'bar')
    .ns('baz')
    .log('This log has multiple namespaces that are added together.');

  t.truthy(log);
  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args.length, 1);

    const parsed = JSON.parse(args[0] as string);
    t.is(parsed.method, 'log');
    t.is(parsed.level, 6);
    t.is(parsed.levelName, 'log');
    t.is(parsed.namespace.length, 3);
    t.is(parsed.namespace[0], 'foo');
    t.is(parsed.namespace[1], 'bar');
    t.is(parsed.namespace[1], 'baz');
    t.is(parsed.args.length, 1);
    t.is(parsed.args[0], 'This log has multiple namespaces that are added together.');
  } else {
    t.fail();
  }
});
