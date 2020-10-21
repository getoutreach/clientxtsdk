/* eslint-disable no-unused-vars */
import { UserContext } from './UserContext'
import { OpportunityContext } from './OpportunityContext'
import { AccountContext } from './AccountContext'
import { Theme } from '../sdk/Theme'
import { Locale } from '../sdk/Locale'
import { ProspectContext } from './ProspectContext'
import { ConfigurationValue } from '../store/configuration/ConfigurationValue'

export class OutreachContext {
    /**
     * Language locale to be used in rendering addon.
     *
     * @type {string}
     * @memberof Context
     */
    public locale: Locale;

    /**
     * A theme addon should be using in rendering.
     *
     * @type {Theme}
     * @memberof Context
     */
    public theme: Theme;

    /**
     * Unique identifier of the Outreach user.
     *
     * @type {string}
     * @memberof Context
     */
    public userIdentifier?: string;

    /**
     * Outreach account context information  (if any)
     *
     * @type {AccountContext}
     * @memberof OutreachContext
     */
    public account?: AccountContext;

    /**
     * Outreach user context information (if any)
     *
     * @type {UserContext}
     * @memberof OutreachContext
     */
    public user?: UserContext;

    /**
     * Current Outreach opportunity context information (if any)
     *
     * @type {OpportunityContext}
     * @memberof OutreachContext
     */
    public opportunity?: OpportunityContext;

    /**
     * Current Outreach prospect context information (if any)
     *
     * @type {ProspectContext}
     * @memberof OutreachContext
     */
    public prospect?: ProspectContext;

    /**
     * Optional section containing configuration values
    * provided by user.
     *
     * @type {ConfigurationValue[]}
     * @memberof OutreachContext
     */
    public config?: ConfigurationValue[];
}
