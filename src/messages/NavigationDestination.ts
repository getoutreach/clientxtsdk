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
   * This navigation destination represents the page associated with the left sidebar addon.
   * The url of the left sidebar addons is outreach.io/cxt/{ADDON_ID} so this navigation destination
   * id parameter will contain an addon id value.
   */
   APP = 'app',

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
