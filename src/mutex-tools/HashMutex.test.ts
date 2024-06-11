import { test, expect } from 'vitest';
import { HashMutex } from './HashMutex';

test('smoke test', () => {
  const mutex = new HashMutex();

  const isExpired_1 = mutex.next();
  expect(isExpired_1()).toBe(false);

  const isExpired_2 = mutex.next();
  const isExpired_3 = mutex.next();
  expect(isExpired_1()).toBe(true);
  expect(isExpired_2()).toBe(true);
  expect(isExpired_3()).toBe(false);
});
