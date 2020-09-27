import { AllScopes } from './Scopes';

export class ManifestApi {
    /**
     * The list of scopes will be used for Outreach API authentication
     * where current Outreach user will be asked to consent for granting
     * permissions for defined scopes to addon creator.
     *
     * @see https://github.com/getoutreach/clientxtsdk#scopes
     * @type {AllScopes[]}
     * @memberof Api
     */
    scopes: AllScopes[];

    /**
     * Address of the endpoint, which will return support refresh token flow.
     *
     * @see https://github.com/getoutreach/clientxtsdk#token-endpoint
     * @type {string}
     * @memberof Api
     */
    token: string;
}
