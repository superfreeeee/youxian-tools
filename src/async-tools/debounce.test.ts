import { debounce } from './debounce';
import { sleep } from './sleep';

test('smoke test', async () => {
  let seq = 0;
  const throttledIncrement = debounce((nextSeq: number) => {
    seq = nextSeq;
  }, 5);

  // active at 2, and ignore 1
  throttledIncrement(1);
  throttledIncrement(2);

  expect(seq).toBe(0);

  await sleep(5);

  expect(seq).toBe(2);
});
