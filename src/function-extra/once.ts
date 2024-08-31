/**
 * Memorize function result, regarless of parameters and return value
 */
export const once = <F extends (...params: any[]) => any>(fn: F): F => {
  let called = false,
    result;
  return ((...args) => {
    if (called) {
      return result;
    }
    result = fn(...args);
    called = true;
    fn = undefined as any; // clear fn ref
    return result;
  }) as F;
};
