/* eslint-disable no-unused-vars */
import { AddonCategory } from './AddonCategory';
import { AddonStore } from './AddonStore';
import { ConfigurationItem } from './configuration/ConfigurationItem';
import { AllContextKeys } from './keys/AllContextKeys';
import { LocalizedString } from './LocalizedString';
import { ManifestApi } from './ManifestApi';
import { ManifestAuthor } from './ManifestAuthor';
import { ManifestHost } from './ManifestHost';
import { ManifestMedia } from './ManifestMedia';

/**
 * Definition of the manifest file containing all the information
 * needed for Outreach platform addon.
 *
 * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#manifest-file
 *
 * @export
 * @class Manifest
 */
export class Manifest {
  /**
   * API section contains the data needed for enabling addon
   * OAuth Outreach API access.
   * In case addon doesn't need client access to Outreach API
   * this section can be omitted from configuration.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#api-optional
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/outreach-api.md
   * @type {ManifestApi}
   * @memberof Manifest
   */
  public api?: ManifestApi;

  /**
   * This section contains information to be presented to a user of the addon in the marketplace and on the
   * consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#author
   * @type {ManifestAuthor}
   * @memberof Manifest
   */
  public author: ManifestAuthor;

  /**
   * Collection of one or more extension categories.
   *
   * @type {AddonCategory[]}
   * @memberof Manifest
   */
  public categories?: AddonCategory[] = [];

  /**
   * In this section, the addon author defines a list of predefined context information that addon needs from Outreach
   * to be sent during the initialization process.
   * It is a string array of predefined Outreach properties describing attributes of the Outreach user loading the addon.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#context
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/context.md
   * @type {AllContextKeys[]}
   * @memberof Manifest
   */
  public context: AllContextKeys[];

  /**
   * An optional section containing configuration information
   * describing what values user needs to provide when interacting
   * for the first time with addon (loading or installing)
   *
   * All of the configuration values will be sent to Addon using the
   * initialization iframe POST message.
   *
   * All of the *public* configuration items will be sent to Addon
   * as the query parameters and can be parsed as such.
   *
   *   *
   * @type {ConfigurationItem[]}
   * @memberof Manifest
   */
  public configuration?: ConfigurationItem[];

  /**
   * A localized addon description is shown in the addon store to
   * explain what the addon does and why someone would want to install it.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#description
   * @type {LocalizedString}
   * @memberof Manifest
   */
  public description: LocalizedString;

  /**
   * Definition of addon host
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#host
   * @type {ManifestHost}
   * @memberof Manifest
   */
  public host: ManifestHost;

  /**
   * Unique identifier of the addon
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#identifier
   * @type {string}
   * @memberof Manifest
   */
  public identifier: string = '';

  /**
   * Collection of zero or more manifest media file used in extension marketplace
   * to explain to Outreach user what extension does.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#media
   *
   * @type {ManifestMedia}
   * @memberof Manifest
   */
  public medias?: ManifestMedia[] = [];

  /**
   * The localized addon title is shown in the addon store and Outreach app as a tab tile.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#title
   * @type {LocalizedString}
   * @memberof Manifest
   */
  public title: LocalizedString;

  /**
   * Type of addon: public, private or personal.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#store
   * @type {AddonStore}
   * @memberof Manifest
   */
  public store: AddonStore;

  /**
   * Manifest version
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/manifest.md#version
   * @type {string}
   * @memberof Manifest
   */
  public version: string;
}
