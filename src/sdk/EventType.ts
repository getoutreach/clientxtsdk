/* eslint-disable no-unused-vars */
export enum EventType {
  /**
   * Event contains internal info regarding functioning of the sdk,
   * and it is not tracking any real communication events between
   * host and addon.
   *
   */
  INTERNAL = 'internal',
  /**
   * Message event type is used for events containing information
   * about real communication events between host and addon.
   */
  MESSAGE = 'message'
}
