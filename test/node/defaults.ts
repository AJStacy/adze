import test from 'ava';
import adze, { ChalkStyle, defaults } from '../../src';
import { applyChalkStyles } from '../../src/env';

global.ADZE_ENV = 'dev';

// ------- Default Node Logs -------- //

test('renders a default alert log', (t) => {
  const t_log = adze().alert('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], applyChalkStyles(' Alert(1)      ', defaults.logLevels.alert.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default error log', (t) => {
  const t_log = adze().error('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'error');
    t.is(args[0], applyChalkStyles(' Error(1)      ', defaults.logLevels.error.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default warn log', (t) => {
  const t_log = adze().warn('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'warn');
    t.is(args[0], applyChalkStyles(' Warn(1)       ', defaults.logLevels.warn.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default info log', (t) => {
  const t_log = adze().info('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' Info(1)       ', defaults.logLevels.info.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default fail log', (t) => {
  const t_log = adze().fail('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' Fail(1)       ', defaults.logLevels.fail.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default success log', (t) => {
  const t_log = adze().success('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'info');
    t.is(args[0], applyChalkStyles(' Success(1)    ', defaults.logLevels.success.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default log', (t) => {
  const t_log = adze().log('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' Log(1)        ', defaults.logLevels.log.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default debug log', (t) => {
  const t_log = adze().debug('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], applyChalkStyles(' Debug(1)      ', defaults.logLevels.debug.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a default verbose log', (t) => {
  const t_log = adze().verbose('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'debug');
    t.is(args[0], applyChalkStyles(' Verbose(1)    ', defaults.logLevels.verbose.terminal));
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});

test('renders a custom log', (t) => {
  const style =
    'padding-right: 26px; border-color: 1px solid red; color: white; border-color: blue;';
  const terminal: ChalkStyle[] = ['bgCyanBright', 'cyan'];
  const { log, render } = adze({
    customLevels: {
      custom: {
        level: 1,
        emoji: '🤪',
        method: 'log',
        terminal,
        style,
      },
    },
  }).custom('custom', 'This is a custom log.');
  t.truthy(log);

  if (render) {
    const [method, args] = render;
    t.is(method, 'log');
    t.is(args[0], applyChalkStyles(' Custom(1)     ', terminal));
    t.is(args[1], 'This is a custom log.');
  } else {
    t.fail();
  }
});

test('terminal styles color fidelity is customizable', (t) => {
  const t_log = adze({ terminalColorFidelity: 0 }).log('testing');
  t.truthy(t_log.log);

  if (t_log.render) {
    const [method, args] = t_log.render;
    t.is(method, 'log');
    t.is(args[0], ' Log(1)        ');
    t.is(args[1], 'testing');
  } else {
    t.fail();
  }
});
