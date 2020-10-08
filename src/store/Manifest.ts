import { ContextParam } from '../context/ContextParam';
import { utils } from '../utils';
/* eslint-disable no-unused-vars */
import { AddonStore } from './AddonStore';
import { AddonType } from './AddonType';
import { AllContextKeys } from './keys/AllContextKeys';
import { ClientContextKeys } from './keys/ClientContextKeys';
import { OpportunityContextKeys } from './keys/OpportunityContextKeys';
import { ProspectContextKeys } from './keys/ProspectContextKeys';
import { UserContextKeys } from './keys/UserContextKeys';
import { LocalizedString } from './LocalizedString';
import { ManifestApi } from './ManifestApi';
import { ManifestAuthor } from './ManifestAuthor';
import { ManifestHost } from './ManifestHost';
import { Scopes } from './Scopes';

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

  /**
   * Object validation
   *
   * @type {boolean}
   * @memberof Manifest
   */
  public isValid: boolean;

  constructor (props?: Manifest) {
    if (!props) {
      return;
    }

    this.author = { ...new ManifestAuthor(), ...props.author };
    this.context = props.context;
    this.description = { ...new LocalizedString(), ...props.description };
    this.host = { ...new ManifestHost(), ...props.host };
    this.identifier = props.identifier?.toString();
    this.title = { ...new LocalizedString(), ...props.title };
    this.store = props.store;
    this.version = props.version?.toString();

    if (props.api) {
      this.api = new ManifestApi(props.api.scopes, props.api.token);
    }

    this.isValid = this.validate();
  }

  public validate (): boolean {
    if (
      this.api &&
      (!this.api.scopes || !Array.isArray(this.api.scopes) || !this.api.token)
    ) {
      return false;
    }

    if (this.api && this.api.scopes && Array.isArray(this.api.scopes)) {
      let scopeValidation = true;
      this.api.scopes.forEach((scope) => {
        if (!Object.values(Scopes).includes(scope as Scopes)) {
          scopeValidation = false;
        }
      });

      if (!scopeValidation) {
        return false;
      }
    }

    if (
      !this.author ||
      !this.author.websiteUrl ||
      !this.author.privacyUrl ||
      !this.author.termsOfUseUrl ||
      this.author.websiteUrl === '' ||
      this.author.privacyUrl === '' ||
      this.author.termsOfUseUrl === '' ||
      !this.urlValidation([
        this.author.websiteUrl,
        this.author.privacyUrl,
        this.author.termsOfUseUrl
      ])
    ) {
      return false;
    }

    if (!this.context || !Array.isArray(this.context)) {
      return false;
    } else {
      let contextValidation = true;
      this.context.forEach((context) => {
        if (
          !Object.values(UserContextKeys).includes(
            context as UserContextKeys
          ) &&
          !Object.values(ClientContextKeys).includes(
            context as ClientContextKeys
          ) &&
          !Object.values(OpportunityContextKeys).includes(
            context as OpportunityContextKeys
          ) &&
          !Object.values(ProspectContextKeys).includes(
            context as ProspectContextKeys
          )
        ) {
          contextValidation = false;
        }
      });

      if (!contextValidation) {
        return false;
      }
    }

    if (this.description && this.description.en === '') {
      return false;
    }

    if (
      !this.host ||
      this.host.icon === '' ||
      this.host.url === '' ||
      !this.hostUrlValidation(this.host.url) ||
      !this.host.type ||
      !Object.values(AddonType).includes(this.host.type as AddonType)
    ) {
      return false;
    }

    if (this.identifier === '') {
      return false;
    }

    if (this.title && this.title.en === '') {
      return false;
    }

    if (
      !this.store ||
      !Object.values(AddonStore).includes(this.store as AddonStore)
    ) {
      return false;
    }

    if (this.version === '') {
      return false;
    }

    return true;
  }

  private hostUrlValidation (hostUrl: string): boolean {
    let validation = true;

    const contextParams: ContextParam[] = [];
    this.context.forEach((key) => contextParams.push({ key, value: 'marker' }));

    try {
      const { url } = utils.tokenizeUrl(hostUrl, contextParams);
      console.log('[Manifest]::hostUrlValidation', hostUrl, url);
      const validatedUrl = new URL(url);

      if (validatedUrl.toString() !== url) {
        validation = false;
      }
    } catch (e) {
      validation = false;
    }

    return validation;
  }

  private urlValidation (urls: string[]): boolean {
    let validation = true;

    urls.forEach((url: string) => {
      try {
        const validatedUrl = new URL(url);

        if (validatedUrl.toString() !== url) {
          validation = false;
        }
      } catch (e) {
        validation = false;
      }
    });

    return validation;
  }
}
