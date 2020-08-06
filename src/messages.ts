export enum AddonMessageType {
    
    /**
     * Message sent from client to host signalizing that the client is ready for initialization
     */
    READY = 'or-client-ready',
    
    /**
     * Message sent from host to client containing in its payload the context information 
     * client needs to initialize addon experience. 
     */
    INIT = 'or-host-init',

    /**
     * Message sent from client to host requesting host to perform new initialization.
     */
    REQUEST_RELOAD = 'or-client-reload',

    /**
     * Message sent from client to host requesting host to notify user about a message client has.
     * (e.g. requesting from host to show a toast informing user that addon had an error)
    */
    REQUEST_NOTIFY = 'or-client-reload',

    /**
     * Message sent from client to host requesting host to update addon extension point adorment
     * (e.g. Tab title to "Messages(2)"")
     */
    REQUEST_DECORATION_UPDATE = 'or-client-decorate',
}


/**
 * SDK addon message sent and received from other addons and/or host
 *
 * @export
 * @class AddonMessage
 */
export class AddonMessage {

    /**
    *Creates an instance of AddonMessage.
    * @param {AddonMessageType} type
    * @memberof AddonMessage
    */
    constructor(type: AddonMessageType) {
        this.type = type;
    }

    /**
     * Type of message being sent
     * 
     * @type {string}
     * @memberof AddonMessage
     */
    public type: AddonMessageType;
}


export class InitMessage extends AddonMessage {
    
    constructor(type: AddonMessageType) {
        super(type);
    }

    /**
     * Host origin value to be used when client sends messages to host.
     *
     * @type {string}
     * @memberof InitMessage
     */
    public origin: string;

}