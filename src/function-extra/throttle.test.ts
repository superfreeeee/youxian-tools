import { sleep } from '../async-tools/sleep';
import { throttle } from './throttle';

test('smoke test', async () => {
  let seq = 0;
  const throttledIncrement = throttle((nextSeq: number) => {
    seq = nextSeq;
  }, 5);

  // active at 1, and ignore 2
  throttledIncrement(1);
  throttledIncrement(2);

  expect(seq).toBe(0);

  await sleep(5);

  expect(seq).toBe(1);
});
