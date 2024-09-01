import { once } from '../function-extra/once';

/**
 * Check current browser support Preformance API
 *
 * @description API Browser Compatibility
 * Performance
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance}
 */
export const SUPPORT_PERFORMANCE_API = !!(
  window.performance && // global performance on window
  window.Performance &&
  window.performance.constructor === window.Performance
);

/**
 * Get compatibility table for Performance API
 */
export const getPerfCompatibility = once(() => {
  return {
    performance: SUPPORT_PERFORMANCE_API,
    'performance.now': !!performance && typeof performance.now === 'function',
    'performance.mark': !!performance && typeof performance.mark === 'function',
    'performance.timeOrigin': !!performance && typeof performance.timeOrigin === 'number',
    'performance.timing': !!performance && !!performance.timing && typeof performance.timing === 'object',
    'performance.getEntries': !!performance && typeof performance.getEntries === 'function',
    'performance.getEntriesByType': !!performance && typeof performance.getEntriesByType === 'function',
  };
});

/**
 * Get performance start time
 *
 * @description API Browser Compatibility
 * performance.timeOrigin
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin}
 * performance.timing.navigationStart
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming}
 */
export const PERF_ORIGIN = performance.timeOrigin && performance.timing.navigationStart && Date.now();

/**
 * Get current performance relative time
 *
 * @description API Browser Compatibility
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/now}
 */
export const perfNow =
  performance && typeof performance.now === 'function'
    ? // performance.now is avaliable
      () => performance.now()
    : // now - perfOrigin
      () => Date.now() - PERF_ORIGIN;

/**
 * Get current performance absolute time
 */
export const perfNowAbs = () => PERF_ORIGIN + perfNow();

type NavigationTiming = {
  level: 2 | 1;
  // redirect stage
  redirectStart: number;
  redirectEnd: number;
  fetchStart: number;
  // DNS stage
  domainLookupStart: number;
  domainLookupEnd: number;
  // TCP stage
  connectStart: number;
  connectEnd: number;
  // Http stage
  requestStart: number;
  responseStart: number;
  responseEnd: number;
};

/**
 * Get Navigation Timing object
 *
 * @description Navigation Timing docs
 * Navigation Timing Level 2
 * {@link https://www.w3.org/TR/navigation-timing-2/}
 * Navigation Timing Level 1
 * {@link https://www.w3.org/TR/navigation-timing/}
 *
 * @description API Browser Compatibility
 * performance.getEntriesByType
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType}
 * performance.getEntries
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries}
 * performance.timing
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing}
 */
export const getNavigationTiming = (): NavigationTiming | undefined => {
  if (typeof performance.getEntriesByType === 'function') {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navigationTiming) {
      const {
        // redirect stage
        redirectStart,
        redirectEnd,
        fetchStart,
        // DNS stage
        domainLookupStart,
        domainLookupEnd,
        // TCP stage
        connectStart,
        connectEnd,
        // Http stage
        requestStart,
        responseStart,
        responseEnd,
      } = navigationTiming;

      return {
        level: 2,
        redirectStart,
        redirectEnd,
        fetchStart,
        domainLookupStart,
        domainLookupEnd,
        connectStart,
        connectEnd,
        requestStart,
        responseStart,
        responseEnd,
      };
    }
  }

  if (performance.timing && typeof performance.timing === 'object') {
    const {
      navigationStart,
      redirectStart,
      redirectEnd,
      fetchStart,
      domainLookupStart,
      domainLookupEnd,
      connectStart,
      connectEnd,
      requestStart,
      responseStart,
      responseEnd,
    } = performance.timing;

    return {
      level: 1,
      redirectStart: Math.max(0, redirectStart - navigationStart),
      redirectEnd: Math.max(0, redirectEnd - navigationStart),
      fetchStart: fetchStart - navigationStart,
      domainLookupStart: domainLookupStart - navigationStart,
      domainLookupEnd: domainLookupEnd - navigationStart,
      connectStart: connectStart - navigationStart,
      connectEnd: connectEnd - navigationStart,
      requestStart: requestStart - navigationStart,
      responseStart: responseStart - navigationStart,
      responseEnd: responseEnd - navigationStart,
    };
  }
};
