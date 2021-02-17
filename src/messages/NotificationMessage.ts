/* eslint-disable no-unused-vars */

import { AddonMessage } from './AddonMessage';
import { AddonMessageType } from './AddonMessageType';
import { NotificationType } from './NotificationType';

export class NotificationMessage extends AddonMessage {
  /**
   *Creates an instance of NotificationMessage.
   * @memberof InitMessage
   */
  constructor () {
    super(AddonMessageType.REQUEST_NOTIFY);
  }

  /**
   * Text of the notification to be shown to Outreach user
   *
   * @type {string}
   * @memberof NotificationMessage
   */
  public notificationText: string;

  /**
   * Type of notification being shown to Outreach user.
   *
   * @type {NotificationType}
   * @memberof NotificationMessage
   */
  public notificationType: NotificationType;
}
