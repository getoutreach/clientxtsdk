import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';

export class ConfigureMessage extends AddonMessage {
  /**
     *Creates an instance of ConfigureMessage.
     * @memberof ConfigureMessage
     */
  constructor () {
    super(AddonMessageType.CONFIGURE);
  }
}
