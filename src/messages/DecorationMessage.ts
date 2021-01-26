import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { DecorationType } from './DecorationType';

export class DecorationMessage extends AddonMessage {
  /**
     *Creates an instance of InitMessage.
     * @memberof InitMessage
     */
  constructor () {
    super(AddonMessageType.REQUEST_DECORATION_UPDATE);
  }

    /**
     * Text of the addon decoration to be shown to Outreach user
     *
     * @type {string}
     * @memberof NotificationMessage
     */
    public decorationValue: string;

    /**
     * 
     *
     * @type {DecorationType}
     * @memberof DecorationMessage
     */
    public decorationType: DecorationType; 
}
