/* eslint-disable no-unused-vars */
import { AddonStore } from './AddonStore';
import { AllContextKeys } from './keys/AllContextKeys';
import { LocalizedString } from './LocalizedString';
import { ManifestApi } from './ManifestApi';
import { ManifestAuthor } from './ManifestAuthor';
import { ManifestHost } from './ManifestHost';

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
   * @type {ManifestApi}
   * @memberof Manifest
   */
  public api?: ManifestApi;

  /**
   * This section contains information to be presented to a user of the addon in the marketplace and on the
   * consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.
   *
   * @see https://github.com/getoutreach/clientxtsdk#author
   * @type {ManifestAuthor}
   * @memberof Manifest
   */
  public author: ManifestAuthor;

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
   * @type {ManifestHost}
   * @memberof Manifest
   */
  public host: ManifestHost;

  /**
   * Unique identifier of the addon
   *
   * @see https://github.com/getoutreach/clientxtsdk#identifier
   * @type {string}
   * @memberof Manifest
   */
  public identifier: string = '';

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
