/* eslint-disable no-unused-vars */

import { OutreachContext } from '../context/OutreachContext';
import { AccountContext } from '../context/AccountContext';
import { UserContext } from '../context/UserContext';
import { OpportunityContext } from '../context/OpportunityContext';
import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
export class InitMessage extends AddonMessage implements OutreachContext {
  /**
   *Creates an instance of InitMessage.
   * @memberof InitMessage
   */
  constructor () {
    super(AddonMessageType.INIT);
  }

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {'en'}
   * @memberof InitMessage
   */
  locale: string = 'en';
  /**
   * A theme addon should be using in rendering.
   *
   * @type {('light' | 'dark')}
   * @memberof InitMessage
   */
  theme: 'light' | 'dark' = 'light';
  /**
   * Unique identifier hash of the Outreach user.
   *
   * @type {(string | undefined)}
   * @memberof InitMessage
   */
  userIdentifier?: string | undefined;
  /**
   * Account context information of the current Outreach user.
   * Undefined if addon manifest is not defining account properties.
   *
   * @type {(AccountContext | undefined)}
   * @memberof InitMessage
   */
  account?: AccountContext | undefined;
  /**
   * User context information of the current Outreach user.
   * Undefined if addon manifest is not defining user properties.
   *
   * @type {(UserContext | undefined)}
   * @memberof InitMessage
   */
  user?: UserContext | undefined;
  /**
   * Opportunity context information of the current Outreach user.
   * Undefined if addon manifest is not defining opportunity properties.
   *
   * @type {(OpportunityContext | undefined)}
   * @memberof InitMessage
   */
  opportunity?: OpportunityContext | undefined;
}
