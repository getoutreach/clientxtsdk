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
import logger, { ILogger } from './sdk/Logger';

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

export * from './sdk/Event';
export { ILogger } from './sdk/Logger';
export * from './sdk/Locale';
export * from './sdk/LogLevel';
export * from './sdk/Theme';

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

  public logger: ILogger = logger

  /**
   * Creates an instance of AddonsSdk.
   * @memberof AddonsSdk
   */
  constructor () {
    this.onInit = (context: OutreachContext) => {
      this.logger.log({
        level: LogLevel.Info,
        message: '[CXT][AddonSdk]::onInit (default)',
        context: [JSON.stringify(context)]
      });
    };

    this.onMessage = (message: AddonMessage) => {
      this.logger.log({
        level: LogLevel.Info,
        message: '[CXT][AddonSdk]::onMessage (default)',
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
      level: LogLevel.Info,
      message: '[CXT][AddonSdk]::ready',
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
    this.logger.log({
      level: LogLevel.Info,
      message: '[CXT][AddonSdk]::notify',
      context: [text, type]
    });

    const message = new NotificationMessage();
    message.notificationText = text;
    message.notificationType = type;
    this.sendMessage(message, true);
  };

  /**
   * Sends request to Outreach hosting app to notify Outreach user
   * about a certain even happening in addon.
   *
   * @memberof AddonsSdk
   */
  public decorate = (text: string) => {
    this.logger.log({
      level: LogLevel.Info,
      message: '[CXT][AddonSdk]::decorate',
      context: [text]
    });

    const message = new DecorationMessage();
    message.decorationText = text;
    this.sendMessage(message, true);
  };

  public getToken = async (skipCache?: boolean): Promise<string | null> => {
    const token = await tokenService.getTokenAsync(skipCache);
    if (token) {
      return token;
    }

    // start the OAuth consent flow

    // user identifier goes to cookie to enable addon oauth server
    // linking the outreach user with the addon external identity.
    document.cookie = `ctx-sdk-user=${
      runtime.userIdentifier
    };Secure;HttpOnly;SameSite=None;max-age:${30 * 24 * 60 * 60}`;

    // request from host to start the authentication process
    // this will reload the iframe with a authentication page shown
    // isntead of the current page
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
        level: LogLevel.Info,
        message: '[CXT][AddonSdk]::sendMessage',
        context: [postMessage, this.origin]
      });
    }

    window.parent.postMessage(postMessage, this.origin);
  }

  private handleReceivedMessage = (messageEvent: MessageEvent) => {
    const addonMessage = this.getAddonMessage(messageEvent);
    if (!addonMessage) {
      this.logger.log({
        level: LogLevel.Trace,
        message:
          '[CXT][AddonSdk]::handleReceivedMessage- ignoring event message',
        context: [messageEvent.origin, JSON.stringify(messageEvent.data)]
      });
      return;
    }

    this.logger.log({
      level: LogLevel.Info,
      message: '[CXT][AddonSdk]::handleReceivedMessage',
      context: [JSON.stringify(messageEvent)]
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
          message:
            '[CXT][AddonSdk]:onReceived - Client event received from host',
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)]
        });
        return;
      default:
        this.logger.log({
          message: '[CXT][AddonSdk]:onReceived - Unknown host message of type:',
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
      message: '[CXT][AddonSdk]::preprocessInitMessage',
      level: LogLevel.Debug,
      context: [
        JSON.stringify(initMessage),
        JSON.stringify(outreachContext),
        this.origin || 'N/A'
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

    if (!messageEvent.data || typeof messageEvent.data !== 'string') {
      this.logger.log({
        level: LogLevel.Debug,
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
          level: LogLevel.Debug,
          message:
            '[CXT][AddonSdk]::getAddonMessage- invalid message data format',
          context: [messageEvent.data]
        });

        return null;
      }
    } catch (e) {
      this.logger.log({
        level: LogLevel.Debug,
        message: '[CXT][AddonSdk]::getAddonMessage- not a json data',
        context: [messageEvent.data, JSON.stringify(e)]
      });

      return null;
    }

    if (this.origin) {
      if (messageEvent.origin !== this.origin) {
        this.logger.log({
          level: LogLevel.Error,
          message: '[CXT][AddonSdk]::getAddonMessage- invalid origin',
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
        level: LogLevel.Error,
        message: '[CXT][AddonSdk]::getAddonMessage- invalid origin received',
        context: [messageEvent.origin]
      });
      return null;
    }

    this.logger.log({
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
