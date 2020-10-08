import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';

export class AuthenticationMessage extends AddonMessage {
  /**
   *Creates an instance of InitMessage.
   * @memberof InitMessage
   */
  constructor () {
    super(AddonMessageType.REQUEST_OAUTH_AUTHENTICATE);
  }
}
