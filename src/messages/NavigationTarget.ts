/* eslint-disable no-unused-vars */
/**
 * List of targets defining the type of navigation
 * addon is requesting from the Outreach host.
 *
 * @export
 * @enum {number}
 */

export enum NavigationTarget {
  /**
   * Navigation should update addon iframe source
   */
  SELF = 'self',

  /**
   * Navigation should create a new browser tab
   */
  BLANK = 'blank'
}
