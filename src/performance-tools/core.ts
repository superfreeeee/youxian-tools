export const isSupportedPerformanceAPI = () =>
  !!(window.performance && window.Performance && window.performance.constructor === window.Performance);
