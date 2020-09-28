import { AddonMessage } from "./AddonMessage";
import { AddonMessageType } from "./AddonMessageType";

export class ReadyMessage extends AddonMessage {
    /**
     *Creates an instance of ReadyMessage.
     * @memberof ReadyMessage
     */
    constructor() {
        super(AddonMessageType.READY);
    }
}