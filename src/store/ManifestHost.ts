import { AddonType } from './AddonType';

export class ManifestHost {
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
