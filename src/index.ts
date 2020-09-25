// eslint-disable-next-line no-unused-vars
import { InitMessage } from "./messages/InitMessage";
import { AddonMessage } from "./messages/AddonMessage";
import { AddonMessageType } from "./messages/AddonMessageType";
// eslint-disable-next-line no-unused-vars
import { OutreachContext } from './context/OutreachContext'

export enum LogLevel {
    None = 0,
    Trace = 10,
    Debug = 20,
    Info = 30,
    Warning = 40,
    Error = 50
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

  /**
   * An array of contextual parameters describing the event state. 
   *
   * @type {unknown[]}
   * @memberof Event
   */
  context: unknown[] = [];
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

      // default handlers impplementation
      this.onInfo = this.defaultHandleOnInfo;

      this.onInit = (context: OutreachContext) => {
        this.onInfo({
          level: LogLevel.Trace,
          message: '[CXT]::onInit (default)',
          context: [ context ]
        })
      }

      this.onMessage = (message: AddonMessage) => {
        this.onInfo({
          level: LogLevel.Trace,
          message: '[CXT]::onMessage (default)',
          context: [ message ]
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
        context: [ postMessage ]
      })

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
          level: LogLevel.Error, 
          context: [ message ]
        })
        return
      }

      const postMessage = JSON.stringify(message)
      
      this.onInfo({
        level: LogLevel.Debug,
        message: '[CXT]::sendMessage',
        context: [postMessage, this.origin]
      })

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
          context: [ messageEvent.origin ]
        })
        return
      }

      if (typeof messageEvent.data !== 'string') {
        this.onInfo({
          level: LogLevel.Warning,
          message: '[CXT]::handleReceivedMessage - message event data is not a string',
          context: [  messageEvent.data ]
        })

        return
      }

      const hostMessage: AddonMessage = JSON.parse(messageEvent.data)
      if (!hostMessage || !hostMessage.type) {
        this.onInfo({
          level: LogLevel.Error,
          message: '[CXT]::handleReceivedMessage- invalid message data format',
          context: [  messageEvent ]
        })

        return
      }

      this.onInfo({
        level: LogLevel.Trace,
        message: '[CXT]::handleReceivedMessage',
        context: [ messageEvent ]
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
            context: [ hostMessage ]
          })
          return
        default:
          this.onInfo({
            message: '[CXT]:onReceived - Unknown host message of type:',
            level: LogLevel.Warning,
            context: [ hostMessage ]
          })
      }
    }

    private preprocessInitMessage (context: InitMessage) {
      this.origin = context.origin

      this.onInfo({
        message: '[CXT]::preprocessInitMessage',
        level: LogLevel.Trace,
        context: [ context, this.origin ]
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
