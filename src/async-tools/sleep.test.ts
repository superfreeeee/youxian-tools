import { test, expect } from 'vitest';
import { sleep } from './sleep';

test('smoke test', async () => {
  const DELAY = 10;

  const start = Date.now();
  await sleep(DELAY);
  const end = Date.now();

  // end - start >= delay
  expect(end - start).toBeGreaterThanOrEqual(DELAY);
});
