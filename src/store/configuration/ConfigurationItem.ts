import { LocalizedString } from '../LocalizedString';
import { ConfigurationItemOption } from './ConfigurationItemOption';
import { ConfigurationItemType } from './ConfigurationItemType';

export class ConfigurationItem {
  /**
   * Keycode of the configuration value.
   * It is sent as a part of the addon initialization context, and through the URL,
   * so it is recommended to be short
   *
   * @type {string}
   * @memberof ManifestConfigurationItem
   */
  public key: string;

  /**
   * Localized text of the label text is shown to a user explaining
   * the configuration value the user needs to provide.
   *
   * @type {LocalizedString}
   * @memberof ManifestConfigurationItem
   */
  public text: LocalizedString;

  /**
   *
   * Type of the configuration value data.
   * This has impact on rendering UI input components.
   *
   * "options" - multiselect control producing an array of option values
   * "select" - single select control selecting one of the possible config values
   *
   * @type {ConfigurationItemType}
   * @memberof ManifestConfigurationItem
   */
  public type: ConfigurationItemType = 'string';

  /**
   * Define if the config value is mandatory and has to be provided by the user.
   *
   * @type {boolean}
   * @memberof ManifestConfigurationItem
   */
  public required: boolean = true;

  /**
   * An optional regex expression which will be used to validate
   * the configuration value entered by user.
   *
   * @type {string}
   * @memberof ManifestConfigurationItem
   */
  public validator?: string;

  /**
   * An optional default value to be offered to user
   * by default when the configuration component loads
   *
   * @type {string}
   * @memberof ConfigurationItem
   */
  public defaultValue?: string;

  /**
   * An optional collection of values is presented to the user
   * if the type is 'options' or 'select' from which the user selects one or more options.
   *
   * @type {ConfigurationItemOption[]}
   * @memberof ConfigurationItem
   */
  public options?: ConfigurationItemOption[];

  /**
   * A value defining if configuration value can be passed through the url or not.
   *
   * @type {boolean}
   * @memberof ConfigurationItem
   */
  public urlInclude: boolean = false;
}
