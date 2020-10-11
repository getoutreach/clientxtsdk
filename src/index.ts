/* eslint-disable no-unused-vars */
import { InitMessage } from './messages/InitMessage';
import { AddonMessage } from './messages/AddonMessage';
import { AddonMessageType } from './messages/AddonMessageType';

import { OutreachContext } from './context/OutreachContext';
import { NotificationType } from './messages/NotificationType';
import { NotificationMessage } from './messages/NotificationMessage';
import { DecorationMessage } from './messages/DecorationMessage';
import { LogLevel } from './sdk/LogLevel';
import { ReadyMessage } from './messages/ReadyMessage';

import { AccountContext } from './context/AccountContext';
import { OpportunityContext } from './context/OpportunityContext';
import { ProspectContext } from './context/ProspectContext';
import { UserContext } from './context/UserContext';

import runtime from './sdk/RuntimeContext';
import tokenService from './services/tokenService';
import { AuthenticationMessage } from './messages/AuthenticationMessage';
import { Logger, ILogger } from './sdk/Logger';
import { Constants } from './sdk/Constants';
import { EventType } from './sdk/EventType';
import { EventOrigin } from './sdk/EventOrigin';

export * from './context/AccountContext';
export * from './context/ContextParam';
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
export * from './messages/ReadyMessage';

export * from './sdk/Constants';
export * from './sdk/Event';
export * from './sdk/EventOrigin';
export * from './sdk/EventType';
export { ILogger } from './sdk/Logger';
export * from './sdk/Locale';
export * from './sdk/LogLevel';
export * from './sdk/Theme';
export * from './sdk/Validator';

export * from './store/keys/AccountContextKeys';
export * from './store/keys/AllContextKeys';
export * from './store/keys/ClientContextKeys';
export * from './store/keys/OpportunityContextKeys';
export * from './store/keys/ProspectContextKeys';
export * from './store/keys/UserContextKeys';
export * from './store/AddonStore';
export * from './store/AddonType';
export * from './store/LocalizedString';
export * from './store/Manifest';
export * from './store/ManifestApi';
export * from './store/ManifestAuthor';
export * from './store/ManifestHost';
export * from './store/Scopes';
export * from './utils';

class AddonsSdk {
  private origin: string | null;

  public activeListener: boolean = false;

  public onInit: (context: OutreachContext) => void;

  public onMessage: (message: AddonMessage) => void;

  public logger: ILogger = new Logger();

  /**
   * Creates an instance of AddonsSdk.
   * @memberof AddonsSdk
   */
  constructor () {
    this.onInit = (context: OutreachContext) => {
      this.logger.log({
        origin: EventOrigin.HOST,
        type: EventType.MESSAGE,
        messageType: AddonMessageType.INIT,
        level: LogLevel.Info,
        message: '[CXT] Addon received init context from host',
        context: [JSON.stringify(context)]
      });
    };

    this.onMessage = (message: AddonMessage) => {
      this.logger.log({
        origin: EventOrigin.HOST,
        type: EventType.MESSAGE,
        messageType: message.type,
        level: LogLevel.Info,
        message: '[CXT] Addon received message from host',
        context: [JSON.stringify(message)]
      });
    };
  }

  /**
   * Informs the interested parties that sdk is initialized and
   * ready to receive messages from host and other participants.
   *
   * @memberof AddonsSdk
   */
  public ready () {
    if (!this.activeListener) {
      this.activeListener = true;
      window.addEventListener('message', this.handleReceivedMessage);
    }

    const postMessage = JSON.stringify(
      new AddonMessage(AddonMessageType.READY)
    );

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: AddonMessageType.READY,
      level: LogLevel.Info,
      message: '[CXT] Addon is sending ready message to host',
      context: [postMessage]
    });

    window.parent.postMessage(postMessage, '*');
  }

  /**
   * Informs the host that addon needs to be reinitialized with
   * fresh init context in order to operate properly
   * @memberof AddonsSdk
   */
  public initRequest = () => {
    this.sendMessage(new ReadyMessage());
  };

  /**
   * Sends request to Outreach hosting app to notify Outreach user
   * about a certain even happening in addon.
   *
   * @memberof AddonsSdk
   */
  public notify = (text: string, type: NotificationType) => {
    const message = new NotificationMessage();
    message.notificationText = text;
    message.notificationType = type;
    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: '[CXT] Addon is sending notification request message to host',
      context: [text, type]
    });
  };

  /**
   * Sends request to Outreach hosting app to notify Outreach user
   * about a certain even happening in addon.
   *
   * @memberof AddonsSdk
   */
  public decorate = (text: string) => {
    const message = new DecorationMessage();
    message.decorationText = text;
    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: '[CXT]Addon is sending decoration request message to host',
      context: [text]
    });
  };

  public getToken = async (skipCache?: boolean): Promise<string | null> => {
    const token = await tokenService.getTokenAsync(skipCache);
    if (token) {
      return token;
    }

    // start the OAuth consent flow
    const cookie = `${Constants.AUTH_USER_STATE_COOKIE_NAME}=${
      runtime.userIdentifier
    };Secure;SameSite=None;Path=/;Domain=${window.location.host};max-age:${7 * 24 * 60 * 60}`;

    // user identifier goes to cookie to enable addon oauth server
    // linking the outreach user with the addon external identity.
    document.cookie = cookie;

    // request from host to start the authentication process
    // this will reload the iframe with a authentication page shown
    // instead of the current page
    this.sendMessage(new AuthenticationMessage());

    return null;
  };

  public sendMessage<T extends AddonMessage> (message: T, logged?: boolean) {
    if (!this.origin) {
      console.error(
        'You can not send messages before SDK is initialized',
        message
      );
      return;
    }
    const postMessage = JSON.stringify(message);

    if (!logged) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.MESSAGE,
        messageType: message.type,
        level: LogLevel.Info,
        message: `[CXT] Addon is sending ${message.type} message to host`,
        context: [postMessage, this.origin]
      });
    }

    window.parent.postMessage(postMessage, this.origin);
  }

  private handleReceivedMessage = (messageEvent: MessageEvent) => {
    const addonMessage = this.getAddonMessage(messageEvent);
    if (!addonMessage) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message:
          '[CXT][AddonSdk]::handleReceivedMessage - ignoring event message as it is not addon message',
        context: [messageEvent.origin, JSON.stringify(messageEvent.data)]
      });
      return;
    }

    this.logger.log({
      origin: EventOrigin.HOST,
      type: EventType.MESSAGE,
      messageType: addonMessage.type,
      level: LogLevel.Info,
      message: `[CXT] Addon had received a ${addonMessage.type} message from host`,
      context: [JSON.stringify(addonMessage)]
    });

    switch (addonMessage.type) {
      case AddonMessageType.INIT: {
        const context = addonMessage as InitMessage;
        this.preprocessInitMessage(context);
        this.onInit(context);
        return;
      }
      case AddonMessageType.READY:
      case AddonMessageType.REQUEST_DECORATION_UPDATE:
      case AddonMessageType.REQUEST_NOTIFY:
      case AddonMessageType.REQUEST_RELOAD:
        this.logger.log({
          origin: EventOrigin.HOST,
          type: EventType.INTERNAL,
          message:
            `[CXT][AddonSdk] :: onReceived - Client event ${addonMessage.type} received from host (ERROR)`,
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)]
        });
        return;
      default:
        this.logger.log({
          origin: EventOrigin.HOST,
          type: EventType.INTERNAL,
          message: `[CXT][AddonSdk] :: onReceived - Unknown event type: ${addonMessage.type}`,
          level: LogLevel.Warning,
          context: [JSON.stringify(addonMessage)]
        });
    }
  };

  private preprocessInitMessage = (initMessage: InitMessage) => {
    runtime.locale = initMessage.locale;
    runtime.theme = initMessage.theme;
    runtime.userIdentifier = initMessage.userIdentifier;
    runtime.api = initMessage.api;

    const outreachContext = new OutreachContext();
    outreachContext.locale = runtime.locale;
    outreachContext.theme = runtime.theme;
    outreachContext.userIdentifier = runtime.userIdentifier;

    const accountContext = new AccountContext();
    const opportunityContext = new OpportunityContext();
    const userContext = new UserContext();
    const prospectContext = new ProspectContext();

    for (let i = 0; i < initMessage.context.length; i++) {
      const param = initMessage.context[i];

      let handled = accountContext.initFrom(param);
      if (handled) {
        outreachContext.account = outreachContext.account || accountContext;
      }

      handled = opportunityContext.initFrom(param);
      if (handled) {
        outreachContext.opportunity =
          outreachContext.opportunity || opportunityContext;
      }

      handled = prospectContext.initFrom(param);
      if (handled) {
        outreachContext.prospect = outreachContext.prospect || prospectContext;
      }

      handled = userContext.initFrom(param);
      if (handled) {
        outreachContext.user = outreachContext.user || userContext;
      }
    }

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      message: '[CXT][AddonSdk]::preprocessInitMessage',
      level: LogLevel.Debug,
      context: [
        `message: ${JSON.stringify(initMessage)}`,
        `context: ${JSON.stringify(outreachContext)}`,
        `origin: ${this.origin || 'N/A'}`
      ]
    });

    this.onInit(outreachContext);
  };

  private getAddonMessage = (
    messageEvent: MessageEvent
  ): AddonMessage | null => {
    if (!messageEvent) {
      return null;
    }

    if (!this.validOrigin(messageEvent.origin)) {
      return null;
    }

    if (!messageEvent.data || typeof messageEvent.data !== 'string') {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message:
          '[CXT][AddonSdk]::getAddonMessage - message event data is not a string',
        context: [JSON.stringify(messageEvent.data)]
      });
      return null;
    }

    let hostMessage: AddonMessage;
    try {
      hostMessage = JSON.parse(messageEvent.data);
      if (!hostMessage || !hostMessage.type) {
        this.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Debug,
          message:
            '[CXT][AddonSdk]::getAddonMessage - invalid message data format',
          context: [messageEvent.data]
        });

        return null;
      }
    } catch (e) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Debug,
        message: '[CXT][AddonSdk]::getAddonMessage - not a json data',
        context: [messageEvent.data, JSON.stringify(e)]
      });

      return null;
    }

    if (this.origin) {
      if (messageEvent.origin !== this.origin) {
        this.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Error,
          message: '[CXT][AddonSdk]::getAddonMessage - invalid origin',
          context: [messageEvent.origin, this.origin]
        });
        return null;
      }
    } else {
      if (!this.initializeOrigin(hostMessage, messageEvent)) {
        return null;
      }
    }

    return hostMessage;
  };

  private initializeOrigin = (
    hostMessage: AddonMessage,
    messageEvent: MessageEvent
  ) => {
    if (hostMessage.type !== AddonMessageType.INIT) {
      return null;
    }

    if (!this.validOrigin(messageEvent.origin)) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Error,
        message: '[CXT][AddonSdk]::getAddonMessage - invalid origin received',
        context: [messageEvent.origin]
      });
      return null;
    }

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      level: LogLevel.Info,
      message: '[CXT][AddonSdk]::getAddonMessage- setting origin',
      context: [messageEvent.origin]
    });

    this.origin = messageEvent.origin;
    return this.origin;
  };

  private validOrigin = (origin: string): boolean => {
    if (!origin) {
      return false;
    }
    return (
      origin.endsWith('outreach.io') ||
      origin.endsWith('outreach-staging.com') ||
      origin.endsWith('outreach-dev.com') ||
      origin.endsWith('localhost')
    );
  };
}

declare global {
  interface Window {
    outreach: {
      log?: LogLevel;
      addonSdk?: AddonsSdk;
    };
  }
}

// exposing sdk as  a global variable
window.outreach = window.outreach || {};
window.outreach.addonSdk = new AddonsSdk();

export default window.outreach.addonSdk;
