import { CustomContext } from './CustomContext';
export declare class AccountContext extends CustomContext {
    /**
     * Unique account identifier
     *
     * @type {string}
     * @memberof AccountContext
     */
    id?: string;
    /**
     * A custom ID for the account, often referencing an ID in an external system.
     *
     * @type {string}
     * @memberof AccountContext
     */
    customId?: string;
    /**
     * A custom description of the account.
     *
     * @type {string}
     * @memberof AccountContext
     */
    description?: string;
    /**
     * The company’s primary geographic region (e.g. "Eastern USA").
     *
     * @type {string}
     * @memberof AccountContext
     */
    locality?: string;
    /**
     * The name of the company (e.g. "Acme Corporation").
     *
     * @type {string}
     * @memberof AccountContext
     */
    name?: string;
    /**
     * A list of tag values associated with the account (e.g. ["Enterprise", "Tier 1"]).
     *
     * @type {string}
     * @memberof AccountContext
     */
    tags?: string;
}
