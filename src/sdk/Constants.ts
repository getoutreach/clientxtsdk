export class Constants {
  /**
   * Name of the local storage setting storing last retrieved access token information
   * which host uses to implement refresh token flow.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/outrach-api.md#caching-the-tokens
   * @static
   * @memberof Constants
   */
  public static AUTH_TOKEN_CACHE_KEY = 'cxt-sdk-token';

  /**
   * Name of the cookie storing the identifier of the
   * current Outreach user. The cookie is submitted to the
   * server as part of initial loading sequence so addon host
   * can correlate and cache retrieved token information with
   * a given user identifier.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/outreach-api.md#token-endpoint
   *
   * @static
   * @memberof Constants
   */
  public static AUTH_USER_STATE_COOKIE_NAME = 'cxt-sdk-user';
}
