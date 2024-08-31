import { once } from './once';

test('smoke test', () => {
  let num = 0;

  const fn = once(() => {
    num += 1;
    return num;
  });

  expect(fn()).toBe(1);
  expect(fn()).toBe(1);
  expect(fn()).toBe(1);
});
