import { AddonStore } from './AddonStore'
import { AddonType } from './AddonType'
import { AllContextKeys } from './ContextKeys';
import { LocalizedString } from './LocalizedString';
import { AllScopes } from './Scopes';

/**
 * Definition of the manifest file containing all the information
 * needed for Outreach platform addon.
 *
 * @see https://github.com/getoutreach/clientxtsdk#manifest-file
 *
 * @export
 * @class Manifest
 */
export class Manifest {
    /**
     * API section contains the data needed for enabling addon 
     * OAuth Outreach API access.
     * In case addon doesn't need client access to Outreach API
     * this secrion can be ommited from configuration.
     *
     * @see https://github.com/getoutreach/clientxtsdk#api-optional
     * @type {Api}
     * @memberof Manifest
     */
    public api?: Api;

    /**
     * This section contains information to be presented to a user of the addon in the marketplace and on the
     * consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.
     *
     * @see https://github.com/getoutreach/clientxtsdk#author
     * @type {Author}
     * @memberof Manifest
     */
    public author: Author;

    /**
     * In this section, the addon author defines a list of predefined context information that addon needs from Outreach 
     * to be sent during the initialization process. 
     * It is a string array of predefined Outreach properties describing attributes of the Outreach user loading the addon.
     *
     * @see https://github.com/getoutreach/clientxtsdk#identifier
     * @type {AllContextKeys[]}
     * @memberof Manifest
     */
    public context: AllContextKeys[];

    /**
     * A localized addon description is shown in the addon store to 
     * explain what the addon does and why someone would want to install it.
     *
     * @see https://github.com/getoutreach/clientxtsdk#description
     * @type {LocalizedString}
     * @memberof Manifest
     */
    public description: LocalizedString;

    /**
     * Definition of addon host
     *
     * @see https://github.com/getoutreach/clientxtsdk#host
     * @type {Host}
     * @memberof Manifest
     */
    public host: Host;

    /**
     * Unique identifier of the addon
     *
     * @see https://github.com/getoutreach/clientxtsdk#identifier
     * @type {string}
     * @memberof Manifest
     */
    public identifier: string;

    /**
     * The localized addon title is shown in the addon store and Outreach app as a tab tile.
     *
     * @see https://github.com/getoutreach/clientxtsdk#title
     * @type {LocalizedString}
     * @memberof Manifest
     */
    public title: LocalizedString;

    /**
     * Type of addon: public, private or personal.
     * @see https://github.com/getoutreach/clientxtsdk#store
     *
     * @type {AddonStore}
     * @memberof Manifest
     */
    public store: AddonStore;

    /**
     * Manifest version
     *
     * @type {string}
     * @memberof Manifest
     */
    public version: string;
}

export class Host {
    
    /**
     * Type property defines what the type of addon is and where it should be loaded.
     * @see https://github.com/getoutreach/clientxtsdk#type-host
     * @type {AddonType}
     * @memberof Host
     */
    type: AddonType;
    
    /**
     * Address where the addon hosting web page is hosted.
     *
     * @see https://github.com/getoutreach/clientxtsdk#url
     * @type {string}
     * @memberof Host
     */
    url: string;
    
    /**
     * Base64 string represents the icon to be shown in the addon store 
     * and (if applicable) in the Outreach app.
     *
     * @see https://github.com/getoutreach/clientxtsdk#icon
     * @type {string}
     * @memberof Host
     */
    icon: string;
}

export class Api {
    
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

export class Author {
    
    /**
     * 
     *
     * @type {string}
     * @memberof Author
     */
    websiteUrl: string;
    
    /**
     * 
     *
     * @type {string}
     * @memberof Author
     */
    privacyUrl: string;
    
    /**
     * 
     *
     * @type {string}
     * @memberof Author
     */
    termsOfUseUrl: string;
}