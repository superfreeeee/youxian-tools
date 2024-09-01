export { type IsExpired, HashMutex } from './async-tools/mutex/HashMutex';

export { sleep } from './async-tools/sleep';
export { withTimeout } from './async-tools/withTimeout';

export { TimeoutError } from './common/TimeoutError';

export { type Deferred, type DeferOptions, defer } from './defer-promise/defer';

export { once } from './function-extra/once';
export { debounce } from './function-extra/debounce';
export { throttle } from './function-extra/throttle';

export {
  SUPPORT_PERFORMANCE_API,
  PERF_ORIGIN,
  perfNow,
  perfNowAbs,
  getNavigationTiming,
} from './performance-tools/core';
