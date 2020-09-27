export declare enum AddonMessageType {
    /**
     * Message sent from client to host signalizing that the client is ready for initialization
     */
    READY = "or-client-ready",
    /**
     * Message sent from host to client containing in its payload the context information
     * client needs to initialize addon experience.
     */
    INIT = "or-host-init",
    /**
     * Message sent from client to host requesting host to perform new initialization.
     */
    REQUEST_RELOAD = "or-client-reload",
    /**
     * Message sent from client to host requesting host to notify user about a message client has.
     * (e.g. requesting from host to show a toast informing user that addon had an error)
    */
    REQUEST_NOTIFY = "or-client-reload",
    /**
     * Message sent from client to host requesting host to update addon extension point adorment
     * (e.g. Tab title to "Messages(2)"")
     */
    REQUEST_DECORATION_UPDATE = "or-client-decorate"
}
