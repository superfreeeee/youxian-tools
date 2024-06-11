/**
 * Create Promise which reject on timeout
 */
export const withTimeout = <T>(promise: Promise<T>, timeout: number) => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => {
        reject({ timeout: true });
      }, timeout);
    }),
  ]);
};
