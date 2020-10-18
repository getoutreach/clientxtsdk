export class Token {
  /**
   * Outreach API access token value
   *
   * @type {string}
   * @memberof Token
   */
  public value: string;

  /**
   * Timestamp after which token is considered expired.
   *
   * @type {number}
   * @memberof Token
   */
  public expiresAt: number;
}
