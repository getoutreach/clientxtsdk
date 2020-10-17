// eslint-disable-next-line no-unused-vars
import { Scopes } from './Scopes';

export class ManifestApi {
    /**
     * Outreach OAuth application id
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/develop/docs/outreach-oauth-settings.md
     * @type {string}
     * @memberof ManifestApi
     */
    applicationId: string;

    /**
     * Outreach OAuth App redirect uri on which the Authorization endpoint is implemented.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/develop/docs/outreach-oauth-settings.md
     * @see https://github.com/getoutreach/clientxtsdk/tree/develop/docs/outreach-api.md#authorization-endpoint
     * @type {string}
     * @memberof ManifestApi
     */
    redirectUri: string;

    /**
     * The list of scopes will be used for Outreach API authentication
     * where current Outreach user will be asked to consent for granting
     * permissions for defined scopes to addon creator.
     *
     * @see https://github.com/getoutreach/clientxtsdk#scopes
     * @type {Scopes[]}
     * @memberof Api
     */
    scopes: Scopes[];

    /**
     * Address of the endpoint, which will return support refresh token flow.
     *
     * @see https://github.com/getoutreach/clientxtsdk/tree/develop/docs/outreach-api.md#token-endpoint
     * @type {string}
     * @memberof Api
     */
    token: string;

    /**
     *
     * Address of the connect endpoint, which will contain a page
     * posting authentication token info back to addon page which
     * had opened the popup.
     *
     * @see https://github.com/getoutreach/clientxtsdk/tree/develop/docs/outreach-api.md#connect-endpoint
     * @type {string}
     * @memberof Api
     */
    connect: string;
}
