// eslint-disable-next-line no-unused-vars
import { Scopes } from './Scopes';

/**
 * Optional section defining parameters needed for accessing Outreach API.
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#api-optional
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/outreach-api.md
 * @export
 * @class ManifestApi
 */
export class ManifestApi {
    /**
     * Outreach OAuth application id
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#applicationid
     * @type {string}
     * @memberof ManifestApi
     */
    applicationId: string;

    /**
     * Outreach OAuth App redirect uri on which the Authorization endpoint is implemented.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#redirecturi
     * @type {string}
     * @memberof ManifestApi
     */
    redirectUri: string;

    /**
     * The list of scopes will be used for Outreach API authentication
     * where current Outreach user will be asked to consent for granting
     * permissions for defined scopes to addon creator.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#scopes
     * @type {Scopes[]}
     * @memberof Api
     */
    scopes: Scopes[];

    /**
     * Address of the endpoint, which will return support refresh token flow.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#token
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
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#token
     * @type {string}
     * @memberof Api
     */
    connect: string;
}
