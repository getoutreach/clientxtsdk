export class Constants {
  /**
   * Name of the local storage setting storing last retreived access token information
   * which host uses to implement refresh token flow.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/develop/docs/host.md#refresh-token-flow
   * @static
   * @memberof Constants
   */
  public static AUTH_TOKEN_CACHE_KEY = 'ctx-sdk-token';

  /**
   * Name of the cookie storing the identifier of the
   * current Outreach user. The cookie is submited to the
   * server as part of initial loading sequence so addon host
   * can correlate and cache retreived token information with
   * a given user identifier.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/develop/docs/host.md#outreach-api-access-support
   *
   * @static
   * @memberof Constants
   */
  public static AUTH_USER_STATE_COOKIE_NAME = 'ctx-sdk-user';
}
