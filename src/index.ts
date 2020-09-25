// eslint-disable-next-line no-unused-vars
import { InitMessage } from "./messages/InitMessage";
import { AddonMessage } from "./messages/AddonMessage";
import { AddonMessageType } from "./messages/AddonMessageType";
// eslint-disable-next-line no-unused-vars
import { OutreachContext } from './context/OutreachContext'

export enum LogLevel {
    // eslint-disable-next-line no-unused-vars
    Trace = 'trace',
    // eslint-disable-next-line no-unused-vars
    Debug = 'debug',
    // eslint-disable-next-line no-unused-vars
    Info = 'info',
    // eslint-disable-next-line no-unused-vars
    Warning = 'warning',
    // eslint-disable-next-line no-unused-vars
    Error = 'error'
}

export class Event {
  /**
   * Message describing the event.
   *
   * @type {string}
   * @memberof Event
   */
  message?: string;

  /**
   * Type of the event.
   *
   * @type {LogLevel}
   * @memberof Event
   */
  level: LogLevel;
}

class AddonsSdk {
    private origin?: string;

    public logging: LogLevel = window.outreach.log || LogLevel.Error;

    public onInit: (context: OutreachContext) => void;

    public onMessage: (message: AddonMessage) => void;

    public onInfo: (event: Event) => void;

    /**
     * Creates an instance of AddonsSdk.
     * @memberof AddonsSdk
     */
    constructor () {
      // define default handlers
      this.onInit = (context: OutreachContext) => {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.log('[CXT]::onInit-NOP', context)
        }
      }

      this.onMessage = (message: AddonMessage) => {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.log('[CXT]::onMessage-NOP', message)
        }
      }

      this.onInfo = (event: Event) => {
        // tslint:disable-next-line: no-console
        console.error('[CXT]::onInfo-NOP', event)
      }

      // subscribe to host messages
      if (this.logging <= LogLevel.Debug) {
        // tslint:disable-next-line: no-console
        console.log('[CXT]::ctor - observing messages: *', postMessage)
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
      if (this.logging <= LogLevel.Debug) {
        // tslint:disable-next-line: no-console
        console.log('[CXT]::ready - origin: *', postMessage)
      }

      window.parent.postMessage(postMessage, '*')
    }

    /**
     * Informs the host that addon needs to be reinitialized with
     * fresh init context in order to operate properly
     * @memberof AddonsSdk
     */
    public initRequest = () => {
      this.sendMessage(new AddonMessage(AddonMessageType.REQUEST_RELOAD))
    }

    public sendMessage<T extends AddonMessage> (message: T) {
      if (!this.origin) {
        this.onInfo({
          message: 'You can not send messages before SDK is initialized',
          level: LogLevel.Error
        })
        return
      }

      const postMessage = JSON.stringify(message)

      if (this.logging <= LogLevel.Debug) {
        // tslint:disable-next-line: no-console
        console.warn('[CXT][Index]::sendMessage', postMessage, this.origin)
      }

      window.parent.postMessage(postMessage, this.origin)
    }

    private handleReceivedMessage = (messageEvent: MessageEvent) => {
      if (this.logging <= LogLevel.Trace) {
        // tslint:disable-next-line: no-console
        console.log('[CXT][Index]::handleReceivedMessage', messageEvent)
      }

      if (!messageEvent || messageEvent.source === window || !messageEvent.data || !messageEvent.origin) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[CXT]::handleReceivedMessage-invalid source, data or origin', messageEvent)
        }
        return
      }

      if (this.origin && messageEvent.origin !== this.origin) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[CXT]::handleReceivedMessage-invalid message origin', messageEvent)
        }
        return
      }

      if (typeof messageEvent.data !== 'string') {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[CXT]::handleReceivedMessage - message event data is not a string', messageEvent.data)
        }
        return
      }

      const hostMessage: AddonMessage = JSON.parse(messageEvent.data)
      if (!hostMessage || !hostMessage.type) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[CXT]::handleReceivedMessage- invalid message data format', messageEvent)
        }
        return
      }

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
          if (this.logging <= LogLevel.Debug) {
            this.onInfo({
              message: '[CXT]:onReceived - Client event received from host' + hostMessage.type,
              level: LogLevel.Debug
            })
          }
          return
        default:
          if (this.logging <= LogLevel.Debug) {
            this.onInfo({
              message: '[CXT]:onReceived - Unknown host message of type:' + hostMessage.type,
              level: LogLevel.Debug
            })
          }
      }
    }

    private preprocessInitMessage (context: InitMessage) {
      this.origin = context.origin

      if (this.logging <= LogLevel.Trace) {
        // tslint:disable-next-line: no-console
        console.log('[CXT][Index]::preprocessInitMessage-> origin', this.origin)
      }
    }
}

declare global {
    interface Window {
        outreach : {
            log?: LogLevel;
            addonSdk: AddonsSdk;
        }
    }
}

// exposing sdk as  a global variable
window.outreach = window.outreach || {}
window.outreach.addonSdk = new AddonsSdk()

export default window.outreach.addonSdk
