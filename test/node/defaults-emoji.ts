import test from 'ava';
import adze, { defaults } from '../../src';
import { applyChalkStyles } from '../../src/env';

global.ADZE_ENV = 'dev';

// =========================
// WITH EMOJI
// =========================

test('renders a default alert log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).alert('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], applyChalkStyles(' 🚨 Alert(1)      ', defaults.logLevels.alert.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default error log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).error('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], applyChalkStyles(' 🔥 Error(1)      ', defaults.logLevels.error.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default warn log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).warn('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'warn');
    t.is(args[0], applyChalkStyles(' 🔔 Warn(1)       ', defaults.logLevels.warn.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default info log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).info('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' 📬 Info(1)       ', defaults.logLevels.info.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default fail log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).fail('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' ❌ Fail(1)       ', defaults.logLevels.fail.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default success log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).success('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' 🎉 Success(1)    ', defaults.logLevels.success.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).log('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' 📌 Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default debug log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).debug('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], applyChalkStyles(' 🐞 Debug(1)      ', defaults.logLevels.debug.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default verbose log with emoji', (t) => {
  const t_log = adze({ useEmoji: true }).verbose('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], applyChalkStyles(' 💤 Verbose(1)    ', defaults.logLevels.verbose.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});
