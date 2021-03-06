import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { DecorationType } from './DecorationType';

export class DecorationMessage extends AddonMessage {
  /**
     *Creates an instance of InitMessage.
     * @memberof DecorationMessage
     */
  constructor () {
    super(AddonMessageType.REQUEST_DECORATION_UPDATE);
  }

    /**
     * Text of the addon decoration to be shown to Outreach user
     *
     * @type {string}
     * @memberof DecorationMessage
     */
    public decorationText: string;

    /**
     * Type of the addon decoration being updated.
     *
     * @type {DecorationType}
     * @memberof DecorationMessage
     */
    public decorationType: DecorationType;
}
