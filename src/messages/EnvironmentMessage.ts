import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { ManifestHostEnvironment } from '../store/ManifestHostEnvironment';

export class EnvironmentMessage extends AddonMessage {
  /**
   * Creates an instance of EnvironmentMessage.
   * @memberof EnvironmentMessage
   */
  constructor () {
    super(AddonMessageType.REQUEST_ENVIRONMENT_UPDATE);
  }

  /**
   * New environment definition addon requests from host.
   *
   * @type {ManifestHostEnvironment}
   * @memberof EnvironmentMessage
   */
  public environment: ManifestHostEnvironment;
}
