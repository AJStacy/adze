import test from 'ava';
import adze, { defaults } from '../../../src';
import { applyChalkStyles } from '../../../src/env';

global.ADZE_ENV = 'dev';

test('log renders when assertion is false (fails)', (t) => {
  const x = 2;
  const { render } = adze()
    // @ts-expect-error This method is attempting to assert that x is equal to 3 even though TS catches it.
    .assert(x === 3)
    .log('Asserts that x is 3.');

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], 'Assertion failed:');
    t.is(args[2], 'Asserts that x is 3.');
  } else {
    t.fail();
  }
});

test('log renders with emoji when assertion is false (fails)', (t) => {
  const x = 2;
  const { render } = adze({ useEmoji: true })
    // @ts-expect-error This method is attempting to assert that x is equal to 3 even though TS catches it.
    .assert(x === 3)
    .log('Asserts that x is 3.');

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' 📌 Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], '❌ Assertion failed:');
    t.is(args[2], 'Asserts that x is 3.');
  } else {
    t.fail();
  }
});

test('log renders when expression is true (passes)', (t) => {
  const x = 2;
  const { render } = adze()
    .test(x === 2)
    .log('Value of x is 2.');

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], 'Expression Passed:');
    t.is(args[2], 'Value of x is 2.');
  } else {
    t.fail();
  }
});

test('log renders with emoji when expression is true (passes)', (t) => {
  const x = 2;
  const { render } = adze({ useEmoji: true })
    .test(x === 2)
    .log('Value of x is 2.');

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' 📌 Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], '✅ Expression Passed:');
    t.is(args[2], 'Value of x is 2.');
  } else {
    t.fail();
  }
});
