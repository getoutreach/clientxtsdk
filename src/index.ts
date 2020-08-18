// eslint-disable-next-line no-unused-vars
import { AddonMessage, AddonMessageType, InitMessage } from './messages'
// eslint-disable-next-line no-unused-vars
import { Context } from './context'

export enum LogLevel {
    // eslint-disable-next-line no-unused-vars
    Trace = 1,
    // eslint-disable-next-line no-unused-vars
    Debug = 2,
    // eslint-disable-next-line no-unused-vars
    Errors = 9
}

export class AddonsSdk {
    private origin?: string;

    public logging: LogLevel = window.outreach.log || LogLevel.Errors;

    public onInit: (context: Context) => void;

    public onMessage: (message: AddonMessage) => void;

    public errorHandler: (message: string, ...optionalParams: any[]) => void;

    /**
     * Creates an instance of AddonsSdk.
     * @memberof AddonsSdk
     */
    constructor () {
      // define default handlers
      this.onInit = (context: Context) => {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.log('[XT]::onInit-NOP', context)
        }
      }

      this.onMessage = (_message: AddonMessage) => {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.log('[XT]::onMessage-NOP', _message)
        }
      }

      this.errorHandler = (_message: string, ..._optionalParams: any[]) => {
        // tslint:disable-next-line: no-console
        console.error(['[XT]::onError-NOP', _message, _optionalParams])
      }

      // subscribe to host messages
      if (this.logging <= LogLevel.Debug) {
        // tslint:disable-next-line: no-console
        console.log('[XT]::ctor - observing messages: *', postMessage)
      }
      window.addEventListener('message', this.handleReceivedMessage)

      // send to host signal that addon is ready
      this.ready()
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
        console.log('[XT]::ready - origin: *', postMessage)
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
        this.errorHandler('You can not send messages before SDK is initialized')
        return
      }

      const postMessage = JSON.stringify(message)

      if (this.logging <= LogLevel.Debug) {
        // tslint:disable-next-line: no-console
        console.warn('[XT][Index]::sendMessage', postMessage, this.origin)
      }

      window.parent.postMessage(postMessage, this.origin)
    }

    private handleReceivedMessage = (messageEvent: MessageEvent) => {
      if (this.logging <= LogLevel.Trace) {
        // tslint:disable-next-line: no-console
        console.log('[XT][Index]::handleReceivedMessage', messageEvent)
      }

      if (!messageEvent || messageEvent.source === window || !messageEvent.data || !messageEvent.origin) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[XT]::handleReceivedMessage-invalid source, data or origin', messageEvent)
        }
        return
      }

      if (this.origin && messageEvent.origin !== this.origin) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[XT]::handleReceivedMessage-invalid message origin', messageEvent)
        }
        return
      }

      if (typeof messageEvent.data !== 'string') {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[XT]::handleReceivedMessage - message event data is not a string', messageEvent.data)
        }
        return
      }

      const hostMessage: AddonMessage = JSON.parse(messageEvent.data)
      if (!hostMessage || !hostMessage.type) {
        if (this.logging <= LogLevel.Trace) {
          // tslint:disable-next-line: no-console
          console.error('[XT]::handleReceivedMessage- invalid message data format', messageEvent)
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
            this.errorHandler('[XT]:onReceived - Client event received from host' + hostMessage.type)
          }
          return
        default:
          if (this.logging <= LogLevel.Debug) {
            this.errorHandler('[XT]:onReceived - Unknown host message of type:' + hostMessage.type)
          }
      }
    }

    private preprocessInitMessage (context: InitMessage) {
      this.origin = context.origin

      if (this.logging <= LogLevel.Trace) {
        // tslint:disable-next-line: no-console
        console.log('[XT][Index]::preprocessInitMessage-> origin', this.origin)
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
const w = window as any
w.outreach = w.outreach || {}
w.outreach.addonSdk = w.vivani.addonSdk || new AddonsSdk()

export default w.vivani.ext
