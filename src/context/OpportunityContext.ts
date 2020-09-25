import { CustomContext } from './CustomContext'

export class OpportunityContext extends CustomContext {
    /**
     * The amount the opportunity is worth.
     *
     * @type {number}
     * @memberof OpportunityContext
     */
    amount: number;

    /**
     * A description of the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    description?: string;

    /**
     * The date the opportunity was created in the external system.
     *
     * @type {Date}
     * @memberof OpportunityContext
     */
    externalCreatedAt: Date;

    /**
     * Unique opportunity identifier.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    id?: string;

    /**
     * `The next step to take for the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    name?: string;

    /**
     * The next step to take for the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    nextStep?: string;

    /**
     * The type of opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    opportunityType?: string;

    /**
     * The chances of the opportunity succeeding, represented as a percentage.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    probability: string;

    /**
     * Tags associated with the opportunity.
     *
     * @type {string}
     * @memberof OpportunityContext
     */
    tags: string;
}
