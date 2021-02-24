// eslint-disable-next-line no-unused-vars
import { AddonType } from './AddonType';
import { ManifestHostEnvironment } from './ManifestHostEnvironment';

/**
 * Section defining the addon creator hosting property.
 *
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#host
 * @export
 * @class ManifestHost
 */
export class ManifestHost {
    /**
     * Type property defines what the type of addon is and where it should be loaded.
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#type
     * @type {AddonType}
     * @memberof Host
     */
    type: AddonType;

    /**
     * Address where the addon hosting web page is hosted.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#url
     * @type {string}
     * @memberof Host
     */
    url: string;

    /**
     * Base64 string represents the icon to be shown in the addon store
     * and (if applicable) in the Outreach app.
     *
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#icon
     * @type {string}
     * @memberof Host
     */
    icon: string;

    /**
     * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#environment
     *
     * @type {ManifestHostEnvironment}
     * @memberof ManifestHost
     */
    environment?: ManifestHostEnvironment;
}
