/**
 * It contains performance measurements on addon loading which addon creators
 * can utilize to improve addon performance, inform users if there are issues and
 * report back to their own telemetry infrastructure.
 *
 * @export
 * @class DiagnosticContext
 */
export class DiagnosticContext {
  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Outreach.
   *
   * @type {string}
   * @memberof DiagnosticContext
   */
  public sessionId: string;

  /**
   * Duration how long it took for addon to be loaded.
   * Measured as time between addon start (iframe element creation) to iframe onloaded event.
   *
   * @type {number}
   * @memberof LoadPerformanceMessage
   */
  public loadTime: number;

  /**
   * Duration how long it took from start(iframe element creation) to host receiving Ready message.
   *
   * @type {number}
   * @memberof LoadPerformanceMessage
   */
  public readyTime: number;
}
