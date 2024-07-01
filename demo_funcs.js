// Run our demo modules
export default function runDemo(adzelib) {
  const adze = adzelib.default;
  defaultLevels(adze);
  withNamespace(adze);
  withLabel(adze, adzelib);
  counting(adze, adzelib);
  time(adze, adzelib);
  tests(adze, adzelib);
  dir(adze);
  table(adze);
  group(adze);
  groupCollapsed(adze);
  trace(adze);
  timestamp(adze);
  silent(adze);
}

function defaultLevels(adze) {
  adze.alert('Example alert log');
  adze.error('Example error log');
  adze.warn('Example warning log');
  adze.info('Example info log');
  adze.fail('Example fail log');
  adze.success('Example success log');
  adze.log('Example log');
  adze.debug('Example debug log');
  adze.verbose('Example verbose log');
  const log2 = adze.seal({ withEmoji: true });
  log2.alert('Example alert log');
  log2.error('Example error log');
  log2.warn('Example warning log');
  log2.info('Example info log');
  log2.fail('Example fail log');
  log2.success('Example success log');
  log2.log('Example log');
  log2.debug('Example debug log');
  log2.verbose('Example verbose log');
  // adze({
  //   useEmoji: true,
  //   customLevels: {
  //     customError: {
  //       level: 1,
  //       method: "error",
  //       style:
  //         "font-size: 10px; font-weight: bold; border-radius: 0 10px 10px 0; border-width: 1px; border-style: solid; padding-right: 10px; background: linear-gradient(to right, #ffcafc, #ff02f2); color: #fff; border-color: #e3bbbb;",
  //       terminal: ["bgRed", "white"],
  //       emoji: "😭",
  //     },
  //   },
  // }).custom("customError", "This is a custom error log");
}

function withNamespace(adze) {
  const logger = adze.ns('foo', 'bar').seal();
  logger.ns('baz').log('This is a namespaced log');
}

function withLabel(adze, { setup, teardown }) {
  setup();
  adze.label('foo').log('This is a labeled log');
  teardown();
}

function counting(adze, { setup, teardown }) {
  setup();
  for (let i = 0; i < 10; i++) {
    adze.label('foo').count.log('This is a labeled log');
  }
  teardown();
}

function time(adze, { setup, teardown }) {
  setup();
  adze.timeNow.log('This is a time log');
  adze.withEmoji.timeNow.log('This is a time log with emoji');
  adze.label('timer').time.log('Starting a timer');
  setTimeout(() => {
    adze.label('timer').timeEnd.log('Ending a timer');
  }, 1000);
  adze.withEmoji.label('timer2').time.log('Starting a timer');
  setTimeout(() => {
    adze.withEmoji.label('timer2').timeEnd.log('Ending a timer with emoji');
    teardown();
  }, 1000);
}

function tests(adze) {
  adze.assert(2 === 4).log('This is a failed assertion!');
  adze.withEmoji.assert(2 === 4).log('This is a failed assertion with emoji!');
  adze.assert(4 === 4).log('This passed so it should not show!');
  adze.if(2 === 2).log('This condition passed!');
  adze.withEmoji.if(2 === 2).log('This condition passed with emoji!');
  adze.if(2 === 4).log('This condition failed so it should not show!');
}

function dir(adze) {
  adze.log({ foo: 'bar' });
  adze.dir.log({ foo: 'bar' });
  adze.log(document.body);
  adze.dirxml.log(document.body);
}

function table(adze) {
  const tabular_data = [
    { firstName: 'Andrew', lastName: 'Stacy' },
    { firstName: 'Jim', lastName: 'Bob' },
  ];
  adze.table.log(tabular_data);
}

function group(adze) {
  adze.group.log('This is a group.');
  adze.log('This is a child of a group log.');
  adze.groupEnd.log();
}

function groupCollapsed(adze) {
  adze.groupCollapsed.log('This is a collapsed group.');
  adze.log('This is a child of a collapsed group.');
  adze.groupEnd.log();
}

function trace(adze) {
  adze.trace.log('Tracing...');
}

function timestamp(adze) {
  adze.timestamp.log('This is a log with the timestamp printed.');
}

function silent(adze) {
  adze.silent.log('You should not see me.');
}
