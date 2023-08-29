import test from 'ava';
import { leadingZeros, hrtime } from '../src/env';

global.ADZE_ENV = 'dev';

test('properly pads a number with leading zeros', (t) => {
  const result = leadingZeros(5, 65);
  const lessThan = leadingZeros(1, 65);

  t.is(result, '00065');
  t.is(lessThan, '65');
});

test('properly returns a valid hrtime', (t) => {
  const time = hrtime();
  const diff = hrtime(time);

  t.is(time.length, 2);
  t.is(diff.length, 2);
});
