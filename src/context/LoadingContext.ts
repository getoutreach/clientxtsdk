/**
 * It contains performance measurements on addon loading which addon creators
 * can utilize to improve addon performance, inform users if there are issues and
 * report back to their own telemetry infrastructure.
 *
 * @export
 * @class LoadingContext
 */
export class LoadingContext {
  /**
   * Duration how long it took for addon to be loaded.
   * Measured as time between addon start (iframe element creation) to iframe onloaded event.
   *
   * @type {number}
   * @memberof LoadingContext
   */
  public loadTime: number;

  /**
   * Duration how long it took from start(iframe element creation) to host receiving Ready message.
   *
   * @type {number}
   * @memberof LoadingContext
   */
  public readyTime: number;
}
