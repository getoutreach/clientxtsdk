import { AddonMessage } from './AddonMessage';
import { NotificationType } from './NotificationType';
export declare class NotificationMessage extends AddonMessage {
    /**
       *Creates an instance of InitMessage.
       * @memberof InitMessage
       */
    constructor();
    /**
     * Text of the notification to be shown to Outreach user
     *
     * @type {string}
     * @memberof NotificationMessage
     */
    notificationText: string;
    /**
     * Type of notification being shown to Outreach user.
     *
     * @type {NotificationType}
     * @memberof NotificationMessage
     */
    notificationType: NotificationType;
}
