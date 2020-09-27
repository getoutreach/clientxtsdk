import { AddonMessageType } from './AddonMessageType';
/**
 * SDK addon message sent and received from other addons and/or host
 *
 * @export
 * @class AddonMessage
 */
export declare class AddonMessage {
    /**
      *Creates an instance of AddonMessage.
      * @param {AddonMessageType} type
      * @memberof AddonMessage
      */
    constructor(type: AddonMessageType);
    /**
     * Type of message being sent
     *
     * @type {string}
     * @memberof AddonMessage
     */
    type: AddonMessageType;
}
