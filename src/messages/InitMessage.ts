/* eslint-disable no-unused-vars */
import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { Theme } from '../sdk/Theme';
import { Locale } from '../sdk/Locale';
import { ContextParam } from '../context/ContextParam';
import { Manifest } from '../store/Manifest';
import { ConfigurationValue } from '../store/configuration/ConfigurationValue';
import { UrlParam } from '../context/UrlParam';
import { DiagnosticContext } from '../context/DiagnosticContext';

export class InitMessage extends AddonMessage {
  /**
   *Creates an instance of InitMessage.
   * @memberof InitMessage
   */
  constructor() {
    super(AddonMessageType.INIT);
  }

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {Locale}
   * @memberof InitMessage
   */
  locale: Locale = Locale.ENGLISH;
  /**
   * A theme addon should be using in rendering.
   *
   * @type {Theme}
   * @memberof InitMessage
   */
  theme: Theme = Theme.LIGHT;
  /**
   * Unique identifier hash of the Outreach user.
   *
   * @type {(string)}
   * @memberof InitMessage
   */
  userIdentifier: string;

  /**
   * Collection of the context parameters
   *
   * @type {ContextParam[]}
   * @memberof InitMessage
   */
  context: ContextParam[] = [];

  /**
   * Collection of window location search parameters
   * in the moment of loading addons
   *
   * @type {UrlParam[]}
   * @memberof InitMessage
   */
  locationSearchParams: UrlParam[] = [];

  /**
   * A manifest definition used to initialize this addon.
   *
   * @type {Manifest}
   * @memberof InitMessage
   */
  manifest: Manifest;

  /**
   * Optional section containing configuration values
   * provided by user.
   *
   * @type {ConfigurationItem[]}
   * @memberof InitMessage
   */
  configuration: ConfigurationValue[];

  /**
   * Host diagnostic information about addon loading measurements.
   *
   * @type {DiagnosticContext}
   * @memberof InitMessage
   */
  diag: DiagnosticContext;
}
