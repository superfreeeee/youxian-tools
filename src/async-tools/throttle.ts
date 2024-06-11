/**
 * throttle function
 * @param fn
 * @param delay
 * @returns
 */
export const throttle = <F extends (...args: any[]) => void>(fn: F, delay: number) => {
  let lock = false;

  return (...args: Parameters<F>) => {
    if (lock) {
      return;
    }

    lock = true;
    setTimeout(() => {
      fn(...args);
      lock = false;
    }, delay);
  };
};
