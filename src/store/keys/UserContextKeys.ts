/* eslint-disable no-unused-vars */
/**
 * The individual that uses the application.
 *
 * @see https://api.outreach.io/api/v2/docs#user
 * @export
 * @enum {number}
 */
export enum UserContextKeys {
    /**
     * The email address of the user.
     */
    EMAIL = 'usr.email',

    /**
     * The first name of the user.
     */
    FIRST_NAME = 'usr.fname',

    /**
     * User id
     */
    ID = 'usr.id',

    /**
     * The last name of the user.
     */
    LAST_NAME = 'usr.lname',

    /**
     * The user's job title (e.g. "Staff Accountant").
     */
    TITLE = 'usr.tit',

    /**
     * A reader friendly unique identifier of the user.
     */
    USERNAME = 'usr.uname',

    CUSTOM_FIELD_1 = 'usr.csf1',
    CUSTOM_FIELD_2 = 'usr.csf2',
    CUSTOM_FIELD_3 = 'usr.csf3',
    CUSTOM_FIELD_4 = 'usr.csf4',
    CUSTOM_FIELD_5 = 'usr.csf5',
}
