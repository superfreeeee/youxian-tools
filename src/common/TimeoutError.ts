/**
 * Specific Error type for Timeout Error
 */
export class TimeoutError extends Error {
  private readonly isTimeout = true;

  static isTimeout(error: Error | undefined) {
    return !!error && (error instanceof TimeoutError || !!(error as TimeoutError).isTimeout);
  }
}
