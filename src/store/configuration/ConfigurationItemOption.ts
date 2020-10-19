import { LocalizedString } from '../LocalizedString';

export class ConfigurationItemOption {
  /**
   * A value which will be used as user entry
   * if this option is selected
   *
   * @type {string}
   * @memberof Option
   */
  value: string;

  /**
   * Localized text of the option shown to a user
   * so the user can pick the right config value.
   *
   * @type {LocalizedString}
   * @memberof Option
   */
  text: LocalizedString;
}
