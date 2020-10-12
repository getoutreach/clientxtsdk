/* eslint-disable no-unused-vars */
import { AddonMessageType } from './AddonMessageType';

/**
 * SDK addon message sent and received from other addons and/or host
 *
 * @export
 * @class AddonMessage
 */
export class AddonMessage {
  /**
    *Creates an instance of AddonMessage.
    * @memberof AddonMessage
    */
  constructor () {
    this.type = AddonMessageType.READY;
  }

  /**
   * Type of message being sent
   *
   * @type {string}
   * @memberof AddonMessage
   */
  public type: AddonMessageType;
}
