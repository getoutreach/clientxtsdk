/* eslint-disable no-unused-vars */
import { InitMessage } from './messages/InitMessage';
import { AddonMessage } from './messages/AddonMessage';
import { AddonMessageType } from './messages/AddonMessageType';

import { OutreachContext } from './context/OutreachContext'
import { NotificationType } from './messages/NotificationType';
import { NotificationMessage } from './messages/NotificationMessage';
import { DecorationMessage } from './messages/DecorationMessage';
import { LogLevel } from './sdk/LogLevel';
import { Event } from './sdk/Event';
import { ReadyMessage } from './messages/ReadyMessage';

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
export * from './store/keys/ContextKeys';
export * from './store/LocalizedString';
export * from './store/Manifest';
export * from './store/Scopes';

class AddonsSdk {
    private origin: string | null;

    public locale: string = 'en';

    public theme: 'light' | 'dark' = 'light';

    public userIdentifier?: string;

    public logging: LogLevel = window.outreach.log || LogLevel.Error;

    public onInit: (context: OutreachContext) => void;

    public onMessage: (message: AddonMessage) => void;

    public onInfo: (event: Event) => void;

    /**
     * Creates an instance of AddonsSdk.
     * @memberof AddonsSdk
     */
    constructor () {
      this.origin = this.getHostOrigin()

      if (!this.origin) {
        return
      }

      // default handlers impplementation
      this.onInfo = this.defaultHandleOnInfo

      this.onInit = (context: OutreachContext) => {
        this.onInfo({
          level: LogLevel.Trace,
          message: '[CXT]::onInit (default)',
          context: [JSON.stringify(context)]
        })
      }

      this.onMessage = (message: AddonMessage) => {
        this.onInfo({
          level: LogLevel.Trace,
          message: '[CXT]::onMessage (default)',
          context: [JSON.stringify(message)]
        })
      }

      window.addEventListener('message', this.handleReceivedMessage)
    }

    /**
     * Informs the interested parties that sdk is initialized and
     * ready to receive messages from host and other participants.
     *
     * @memberof AddonsSdk
     */
    public ready () {
      const postMessage = JSON.stringify(new AddonMessage(AddonMessageType.READY))

      this.onInfo({
        level: LogLevel.Debug,
        message: '[CXT]::ready',
        context: [postMessage]
      })

      if (!this.origin) {
        console.error('Can not send ready message as the origin info is invalid', this.origin)
        return
      }

      window.parent.postMessage(postMessage, this.origin)
    }

    /**
     * Informs the host that addon needs to be reinitialized with
     * fresh init context in order to operate properly
     * @memberof AddonsSdk
     */
    public initRequest = () => {
      this.sendMessage(new ReadyMessage())
    }

    /**
     * Sends request to Outreach hosting app to notify Outreach user
     * about a certain even happening in addon.
     *
     * @memberof AddonsSdk
     */
    public notify = (text: string, type: NotificationType) => {
      this.onInfo({
        level: LogLevel.Info,
        message: '[CXT]::notify',
        context: [text, type]
      })

      const message = new NotificationMessage()
      message.notificationText = text;
      message.notificationType = type
      this.sendMessage(message, true)
    }

    /**
     * Sends request to Outreach hosting app to notify Outreach user
     * about a certain even happening in addon.
     *
     * @memberof AddonsSdk
     */
    public decorate = (text: string) => {
      this.onInfo({
        level: LogLevel.Info,
        message: '[CXT]::decorate',
        context: [text]
      })

      const message = new DecorationMessage();
      message.decorationText = text;
      this.sendMessage(message, true);
    }

    public sendMessage<T extends AddonMessage> (message: T, logged?: boolean) {
      if (!this.origin) {
        console.error('You can not send messages before SDK is initialized', message);
        return
      }
      const postMessage = JSON.stringify(message)

      if (!logged) {
        this.onInfo({
          level: LogLevel.Debug,
          message: '[CXT]::sendMessage',
          context: [postMessage, this.origin]
        })
      }

      window.parent.postMessage(postMessage, this.origin)
    }

    private handleReceivedMessage = (messageEvent: MessageEvent) => {
      if (!messageEvent || messageEvent.source === window || !messageEvent.data || !messageEvent.origin) {
        // do nothing - ignore the noise
        return
      }

      if (this.origin && messageEvent.origin !== this.origin) {
        this.onInfo({
          level: LogLevel.Warning,
          message: '[CXT]::handleReceivedMessage-invalid message origin ',
          context: [messageEvent.origin]
        })
        return
      }

      if (typeof messageEvent.data !== 'string') {
        this.onInfo({
          level: LogLevel.Warning,
          message: '[CXT]::handleReceivedMessage - message event data is not a string',
          context: [messageEvent.data]
        })

        return
      }

      const hostMessage: AddonMessage = JSON.parse(messageEvent.data)
      if (!hostMessage || !hostMessage.type) {
        this.onInfo({
          level: LogLevel.Error,
          message: '[CXT]::handleReceivedMessage- invalid message data format',
          context: [JSON.stringify(messageEvent)]
        })

        return
      }

      this.onInfo({
        level: LogLevel.Trace,
        message: '[CXT]::handleReceivedMessage',
        context: [JSON.stringify(messageEvent)]
      })

      switch (hostMessage.type) {
        case AddonMessageType.INIT: {
          const context = hostMessage as InitMessage
          this.preprocessInitMessage(context)
          this.onInit(context)
          return
        }
        case AddonMessageType.READY:
        case AddonMessageType.REQUEST_DECORATION_UPDATE:
        case AddonMessageType.REQUEST_NOTIFY:
        case AddonMessageType.REQUEST_RELOAD:
          this.onInfo({
            message: '[CXT]:onReceived - Client event received from host',
            level: LogLevel.Error,
            context: [JSON.stringify(hostMessage)]
          })
          return
        default:
          this.onInfo({
            message: '[CXT]:onReceived - Unknown host message of type:',
            level: LogLevel.Warning,
            context: [JSON.stringify(hostMessage)]
          })
      }
    }

    private preprocessInitMessage (context: InitMessage) {
      this.locale = context.locale;
      this.theme = context.theme;
      this.userIdentifier = context.userIdentifier;

      if (!this.origin) {
        console.error('Can not preprocess initMessage as the origin info is invalid', this.origin);
        return;
      }

      this.onInfo({
        message: '[CXT]::preprocessInitMessage',
        level: LogLevel.Trace,
        context: [JSON.stringify(context), this.origin]
      })
    }

    private defaultHandleOnInfo = (event: Event) => {
      switch (event.level) {
        case LogLevel.None:
          // ignore the event
          break;
        case LogLevel.Trace:
          if (this.logging >= LogLevel.Trace) {
            // tslint:disable-next-line: no-console
            console.debug('[CXT]::onInfo-trace (default)', event, event.context)
          }
          break;
        case LogLevel.Debug:
          if (this.logging >= LogLevel.Debug) {
            // tslint:disable-next-line: no-console
            console.debug('[CXT]::onInfo-debug (default)', event, event.context)
          }
          break;
        case LogLevel.Info:
          if (this.logging >= LogLevel.Info) {
            // tslint:disable-next-line: no-console
            console.info('[CXT]::onInfo-info (default)', event, event.context)
          }
          break;
        case LogLevel.Warning:
          if (this.logging >= LogLevel.Info) {
            // tslint:disable-next-line: no-console
            console.warn('[CXT]::onInfo-warning (default)', event, event.context)
          }
          break;
        case LogLevel.Error:
          // tslint:disable-next-line: no-console
          console.error('[CXT]::onInfo-error (default)', event, event.context)
          break;
      }
    }

    private getHostOrigin = () => {
      const loc = window.parent.location;
      let hostOrigin = `${loc.protocol}//${loc.hostname}`;

      if (loc.port && loc.port !== '80' && loc.port !== '433') {
        hostOrigin += `:${loc.port}`;
      }

      if (hostOrigin.endsWith('outreach.io') ||
          loc.hostname === 'localhost') {
        return hostOrigin;
      } else {
        console.error('Invalid host origin:' + hostOrigin);
        return null;
      }
    }
}

declare global {
    interface Window {
        outreach : {
            log?: LogLevel;
            addonSdk?: AddonsSdk;
        }
    }
}

// exposing sdk as  a global variable
window.outreach = window.outreach || {}
window.outreach.addonSdk = new AddonsSdk()

export default window.outreach.addonSdk
