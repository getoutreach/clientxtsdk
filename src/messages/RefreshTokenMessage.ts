import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { Token } from '../sdk/Token';

/**
 * A message sent from host to client containing the fresh
 * access token to be used by SDK.
 *
 * @export
 * @class RefreshTokenMessage
 * @extends {AddonMessage}
 */
export class RefreshTokenMessage extends AddonMessage {
  /**
     *Creates an instance of RefreshTokenMessage.
     * @memberof RefreshTokenMessage
     */
  constructor () {
    super(AddonMessageType.REFRESH_AUTH_TOKEN);
  }

  /**
   * Access token to be used as bearer token for Outreach API access.
   *
   * @type {Token}
   * @memberof TokenMessage
   */
  public token: Token;
}
