import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { NavigationDestination } from './NavigationDestination';
import { NavigationTarget } from './NavigationTarget';

/**
 * Message sent from the addon to host requesting that host
 * navigate away addon iframe to a different part of the Outreach application
 *
 * @export
 * @class NavigationMessage
 * @extends {AddonMessage}
 */
export class NavigationMessage extends AddonMessage {
  /**
     *Creates an instance of InitMessage.
     * @memberof NavigationMessage
     */
  constructor () {
    super(AddonMessageType.REQUEST_NAVIGATE);
  }

  /**
   * Host destination of the navigation request.
   *
   * @type {NavigationDestination}
   * @memberof NavigationMessage
   */
  public destination: NavigationDestination;

  /**
   * Identity value (if any)
   *
   * @type {string}
   * @memberof NavigationMessage
   */
  public id?: string;

  /**
   * List of key value parameters to be sent to the navigation destination (if any)
   *
   * @type {{ [key: string]: string}}
   * @memberof NavigationMessage
   */
  public params?: { [key: string]: string };

  /**
   * Defines a type of the navigation host is to perform.
   *
   * - self   Host is updating addon iframe source
   * - blank  Host is opening a new browser tab
   *
   * @type {NavigationTarget}
   * @memberof NavigationMessage
   */
  public target: NavigationTarget = NavigationTarget.SELF;
}
