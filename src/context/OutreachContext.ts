// eslint-disable-next-line no-unused-vars
import { UserContext } from './UserContext'
// eslint-disable-next-line no-unused-vars
import { OpportunityContext } from './OpportunityContext'
// eslint-disable-next-line no-unused-vars
import { AccountContext } from './AccountContext'

export interface OutreachContext {
    /**
     * Language locale to be used in rendering addon.
     *
     * @type {string}
     * @memberof Context
     */
    locale: string;

    /**
     * A theme addon should be using in rendering.
     *
     * @type {('light' | 'dark')}
     * @memberof Context
     */
    theme: 'light' | 'dark';

    /**
     * Unique identifier of the Outreach user.
     *
     * @type {string}
     * @memberof Context
     */
    userIdentifier?: string;

    /**
     * Outreach account context information  (if any)
     *
     * @type {AccountContext}
     * @memberof OutreachContext
     */
    account?: AccountContext;

    /**
     * Outreach user context information (if any)
     *
     * @type {UserContext}
     * @memberof OutreachContext
     */
    user?: UserContext;

    /**
     * Outreach opportunity context information (if any)
     *
     * @type {OpportunityContext}
     * @memberof OutreachContext
     */
    opportunity?: OpportunityContext;
}
