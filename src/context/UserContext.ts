export class UserContext {
    /**
     * Unique user identifier
     *
     * @type {string}
     * @memberof UserContext
     */
    id?: string;

    /**
     * The email address of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    email?: string;

    /**
     * The first name of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    firstName?: string;

    /**
     * The last name of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    lastName?: string;

    /**
     * The user's job title (e.g. "Staff Accountant").
     *
     * @type {string}
     * @memberof UserContext
     */
    title?: string;

    /**
     * A reader friendly unique identifier of the user.
     *
     * @type {string}
     * @memberof UserContext
     */
    username?: string;

    custom1?: string;
    custom2?: string;
    custom3?: string;
    custom4?: string;
    custom5?: string;
}
