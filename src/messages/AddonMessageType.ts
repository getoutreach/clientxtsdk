export enum AddonMessageType {
  /**
   * Message sent from client to host signalizing that the client is ready for initialization
   */
  // eslint-disable-next-line no-unused-vars
  READY = 'or-client-ready',
  /**
   * Message sent from host to client containing in its payload the context information
   * client needs to initialize addon experience.
   */
  // eslint-disable-next-line no-unused-vars
  INIT = 'or-host-init',
  /**
   * Message sent from client to host requesting host to perform new initialization.
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_RELOAD = 'or-client-reload',
  /**
   * Message sent from client to host requesting host to notify user about a message client has.
   * (e.g. requesting from host to show a toast informing user that addon had an error)
  */
  // eslint-disable-next-line no-unused-vars
  REQUEST_NOTIFY = 'or-client-reload',
  /**
   * Message sent from client to host requesting host to update addon extension point adorment
   * (e.g. Tab title to "Messages(2)"")
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_DECORATION_UPDATE = 'or-client-decorate'
}
