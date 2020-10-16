import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';

export class TokenMessage extends AddonMessage {
  /**
     *Creates an instance of ReadyMessage.
     * @memberof ReadyMessage
     */
  constructor () {
    super(AddonMessageType.CONNECT_AUTH_TOKEN);
  }

  /**
   * Access token to be used as bearer token for Outreach API access.
   *
   * @type {string}
   * @memberof TokenMessage
   */
  public token: string;

  /**
   * Time when token will expire.
   *
   * @type {number}
   * @memberof TokenMessage
   */
  public expiresAt: number;
}
