import { TimeoutError } from './TimeoutError';

test('smoke test', () => {
  expect(new TimeoutError()).to;
});
