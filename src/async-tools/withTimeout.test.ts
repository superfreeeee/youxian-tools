import { test, expect } from 'vitest';
import { sleep } from './sleep';
import { withTimeout } from './withTimeout';

test('smoke test', () => {
  const task = async () => {
    await sleep(10);
  };

  expect(() => withTimeout(task(), 5)).rejects.toEqual({ timeout: true });
});

test('resolve first', async () => {
  const task = async () => {
    await sleep(5);
    return 1;
  };

  const res = await withTimeout(task(), 10);
  expect(res).toBe(1);
});
