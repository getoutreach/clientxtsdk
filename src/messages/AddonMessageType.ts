/* eslint-disable no-unused-vars */
export enum AddonMessageType {
  /**
   * Message sent from client to host signalizing that the client is ready for initialization
   */
  // eslint-disable-next-line no-unused-vars
  READY = 'cxt:sdk:ready',
  /**
   * Message sent from host to client containing in its payload the context information
   * client needs to initialize addon experience.
   */
  // eslint-disable-next-line no-unused-vars
  INIT = 'cxt:sdk:init',
  /**
   * Message sent from client to host requesting host to perform new initialization.
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_RELOAD = 'cxt:sdk:reload',
  /**
   * Message sent from client to host requesting host to notify user about a message client has.
   * (e.g. requesting from host to show a toast informing user that addon had an error)
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_NOTIFY = 'cxt:sdk:notify',
  /**
   * Message sent from client to host requesting host to update addon extension point adornment
   * (e.g. Tab title to "Messages(2)"")
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_DECORATION_UPDATE = 'cxt:sdk:decorate',

  /**
   * Message received from host containing the new authentication token
   */
  REFRESH_AUTH_TOKEN = 'cxt:sdk:token',

  /**
   * Message received from the OAuth popup window containing new token information.
   */
  CONNECT_AUTH_TOKEN = 'cxt:connect:token',

  /**
   * Message sent from client to host displaying configuration form
   */
  CONFIGURE = 'cxt:sdk:configure',

  /**
   * Message sent from the addon to host requesting host to navigate its iframe to another Outreach page.
   */
  REQUEST_NAVIGATE = 'cxt:sdk:navigate',

  /**
   * Message sent from the addon to host requesting from host to update hosting environment
   */
  REQUEST_ENVIRONMENT_UPDATE = 'ctx:sdk:environment',

  /**
   * Message sent from host to addon containing the diagnostic info on addon loading
   */
  HOST_LOAD_INFO = 'ctx:host:load',
}
