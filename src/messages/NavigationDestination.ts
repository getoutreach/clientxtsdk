/* eslint-disable no-unused-vars */

/**
 * List of navigation destinations which addon can request
 * from Outreach host to be navigated to
 *
 * @export
 * @enum {number}
 */
export enum NavigationDestination {

  /**
   * Prospects page
   */
  PROSPECT = 'prospect',

  /**
   * Account page
   */
  ACCOUNT = 'account',

  /**
   * Opportunity page
   */
  OPPORTUNITY = 'opportunity'
}
