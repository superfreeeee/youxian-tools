import { TimeoutError } from '../common/TimeoutError';

import { withTimeout } from './withTimeout';
import { sleep } from './sleep';

test('smoke test', () => {
  expect(() => withTimeout(sleep(10), 5)).rejects.toThrow(TimeoutError);
});

test('resolve first', async () => {
  const task = async () => {
    await sleep(5);
    return 1;
  };

  const res = await withTimeout(task(), 10);
  expect(res).toBe(1);
});
