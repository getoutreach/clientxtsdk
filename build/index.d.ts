import { AddonMessage } from './messages/AddonMessage';
import { OutreachContext } from './context/OutreachContext';
import { NotificationType } from './messages/NotificationType';
import { LogLevel } from './sdk/LogLevel';
import { Event } from './sdk/Event';
export * from './context/AccountContext';
export * from './context/CustomContext';
export * from './context/OpportunityContext';
export * from './context/OutreachContext';
export * from './context/UserContext';
export * from './messages/AddonMessage';
export * from './messages/AddonMessageType';
export * from './messages/DecorationMessage';
export * from './messages/InitMessage';
export * from './messages/NotificationMessage';
export * from './messages/NotificationType';
export * from './sdk/Event';
export * from './sdk/LogLevel';
export * from './store/AddonStore';
export * from './store/AddonType';
export * from './store/ContextKeys';
export * from './store/LocalizedString';
export * from './store/Manifest';
export * from './store/Scopes';
declare class AddonsSdk {
    private origin;
    locale: string;
    theme: 'light' | 'dark';
    userIdentifier?: string;
    logging: LogLevel;
    onInit: (context: OutreachContext) => void;
    onMessage: (message: AddonMessage) => void;
    onInfo: (event: Event) => void;
    /**
     * Creates an instance of AddonsSdk.
     * @memberof AddonsSdk
     */
    constructor();
    /**
     * Informs the interested parties that sdk is initialized and
     * ready to receive messages from host and other participants.
     *
     * @memberof AddonsSdk
     */
    ready(): void;
    /**
     * Informs the host that addon needs to be reinitialized with
     * fresh init context in order to operate properly
     * @memberof AddonsSdk
     */
    initRequest: () => void;
    /**
     * Sends request to Outreach hosting app to notify Outreach user
     * about a certain even happening in addon.
     *
     * @memberof AddonsSdk
     */
    notify: (text: string, type: NotificationType) => void;
    /**
     * Sends request to Outreach hosting app to notify Outreach user
     * about a certain even happening in addon.
     *
     * @memberof AddonsSdk
     */
    decorate: (text: string) => void;
    sendMessage<T extends AddonMessage>(message: T, logged?: boolean): void;
    private handleReceivedMessage;
    private preprocessInitMessage;
    private defaultHandleOnInfo;
    private getHostOrigin;
}
declare global {
    interface Window {
        outreach: {
            log?: LogLevel;
            addonSdk?: AddonsSdk;
        };
    }
}
declare const _default: AddonsSdk;
export default _default;
