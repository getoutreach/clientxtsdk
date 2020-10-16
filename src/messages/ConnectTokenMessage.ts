import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { Token } from '../sdk/Token';

/**
 * Message received from OAuth connect window containing
 * the valid access token for Outreach API access.
 *
 * @export
 * @class ConnectTokenMessage
 * @extends {AddonMessage}
 */
export class ConnectTokenMessage extends AddonMessage {
  /**
     *Creates an instance of ConnectTokenMessage.
     * @memberof ConnectTokenMessage
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
