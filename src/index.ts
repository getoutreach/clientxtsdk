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

import runtime, { RuntimeContext } from './sdk/RuntimeContext';
import tokenService from './services/tokenService';
import authService from './services/oauthService';

import { Logger, ILogger } from './sdk/Logger';
import { Constants } from './sdk/Constants';
import { EventType } from './sdk/EventType';
import { EventOrigin } from './sdk/EventOrigin';
import { ConnectTokenMessage } from './messages/ConnectTokenMessage';
import { utils } from './utils';
import { ConfigureMessage } from './messages/ConfigureMessage';
import { DecorationType } from './messages/DecorationType';
import { NavigationDestination } from './messages/NavigationDestination';
import { NavigationMessage } from './messages/NavigationMessage';

export * from './context/AccountContext';
export * from './context/ContextParam';
export * from './context/CustomContext';
export * from './context/OpportunityContext';
export * from './context/OutreachContext';
export * from './context/UserContext';

export * from './messages/AddonMessage';
export * from './messages/AddonMessageType';
export * from './messages/ConnectTokenMessage';
export * from './messages/DecorationMessage';
export * from './messages/DecorationType';
export * from './messages/InitMessage';
export * from './messages/NavigationDestination';
export * from './messages/NavigationMessage';
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
export * from './sdk/RuntimeContext';
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

class Task<T> {
  public promise: Promise<T>;
  public onfulfilled: (value: T) => void;
  public onrejected: (reason: any) => void;
}

class AddonsSdk {
  private initTimer?: number;
  private initTask?: Task<OutreachContext>;

  private authorizeTask: Task<string | null>;

  public getRuntime = (): RuntimeContext => runtime;
  public activeListener: boolean = false;

  /**
   * Setting of the cookie cxt-sdk-user
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/main/docs/outreach-api.md#caching-the-tokens
   * @memberof AddonsSdk
   */
  public cookie = {
    name: Constants.AUTH_USER_STATE_COOKIE_NAME,
    domain: window.location?.host,
    maxAge: 1 * 60 * 60 // one hour
  };

  /**
   * Init handler being invoked when addon initialized is completed
   * and addon receives from the Outreach host initialization context
   *
   * @deprecated Since version 0.10. Will be removed in version 1.0. Use instead await sdk.init()
   *
   * @memberof AddonsSdk
   */
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
        message: '[CXT] addon.onInit received initialization context',
        context: [`context: ${JSON.stringify(context, null, 2)}`]
      });
    };

    this.onMessage = (message: AddonMessage) => {
      this.logger.log({
        origin: EventOrigin.HOST,
        type: EventType.MESSAGE,
        messageType: message.type,
        level: LogLevel.Info,
        message: `[CXT] Addon received message:${message.type}  from host`,
        context: [JSON.stringify(message)]
      });
    };
  }

  /**
   * Informs the interested parties that sdk is initialized and
   * ready to receive messages from host and other participants.
   *
   * @memberof AddonsSdk
   * @deprecated Since version 0.10. Will be removed in version 1.0. Use instead await sdk.init()
   */
  public ready () {
    console.warn('Ready function is depricated. Use instead await sdk.init()');

    this.init();
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
  public notify = async (text: string, type: NotificationType) => {
    await this.verifySdkInitialized();

    const message = new NotificationMessage();
    message.notificationText = text;
    message.notificationType = type;
    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[CXT] Addon is sending ${message.type} message to host`,
      context: [`Notification text: ${text}`, `Notification type: ${type}`]
    });
  };

  /**
   * Sends request to Outreach hosting app to notify Outreach user
   * about a certain even happening in addon.
   *
   * @param {string} value The new decoration value being requested to be shown by the host
   * @param {DecorationType} [type='text'] Type of decoration update (text by default)
   * @memberof AddonsSdk
   */
  public decorate = async (value: string, type: DecorationType = 'text') => {
    await this.verifySdkInitialized();

    const message = new DecorationMessage();
    message.decorationText = value;
    message.decorationType = type;

    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[CXT] Addon is sending ${message.type} message to host`,
      context: [`Decoration text: ${value}`]
    });
  };

  /**
   * Sends request to Outreach hosting app to display the configuration form.
   *
   * @memberof AddonsSdk
   */
  public configure = async () => {
    await this.verifySdkInitialized();

    const message = new ConfigureMessage();
    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[CXT] Addon is sending ${message.type} message to host`,
      context: []
    });
  };

  /**
   * Request from the host to navigate to a different part of the Outreach application.
   *
   * @param {NavigationDestination} destination Host destination of the navigation request.
   * @param {string} [id] Identity value (if any)
   * @param {{ [key: string]: string}} [params] List of key value parameters to be sent to the navigation destination (if any)
   * @param {NavigationTarget} [target]
   */
  public navigate = async (destination: NavigationDestination, id?: string, params?: { [key: string]: string}) => {
    await this.verifySdkInitialized();

    const message = new NavigationMessage();
    message.destination = destination;
    message.id = id;
    message.params = params;
    this.sendMessage(message, true);

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[CXT] Addon is sending ${message.type} message to host`,
      context: []
    });
  }

  /**
   * Initialize the SDK by sending a ready() signal to the Outreach host
   * and resolving a promise when Outreach host responds with a current user
   * initialization context
   *
   * @returns {Promise<OutreachContext>}
   * @memberof AddonsSdk
   */
  public init = async (): Promise<OutreachContext> => {
    if (this.initTask) {
      return this.initTask.promise;
    }

    this.initTask = new Task<OutreachContext>();
    this.initTask.promise = new Promise<OutreachContext>((resolve, reject) => {
      this.initTask!.onfulfilled = resolve;
      this.initTask!.onrejected = reject;

      if (!this.activeListener) {
        this.activeListener = true;
        window.addEventListener('message', this.handleReceivedMessage);
      }

      const message = new ReadyMessage();
      const postMessage = JSON.stringify(message);

      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.MESSAGE,
        messageType: AddonMessageType.READY,
        level: LogLevel.Info,
        message: `[CXT] Addon is sending ${message.type} message to host`,
        context: []
      });

      window.parent.postMessage(postMessage, '*');

      this.initTimer = window.setTimeout(() => {
        const error = '[CXT] Addon initialization failed - timeout error';
        console.error(error);
        reject(error);
      }, 10 * 1000);
    });

    return this.initTask.promise;
  }

  /**
   *
   * Initialize the OAuth consent process by presenting to Outreach user
   * a form where he needs to consent with granting access rights defined
   * in manifest.api.scopes.
   * It is a promise, which will resolve once the OAuth popup closes and
   * user consents
   *
   * NOTE: This method is showing a popup and to avoid popup blocking
   * it has to be invoked in a handler of the direct user action
   * (e.g. user clicked a button)
   *
   * @returns {Promise<string | null>}
   * @memberof AddonsSdk
   */
  public authenticate = async (): Promise<string | null> => {
    await this.verifySdkInitialized();

    this.authorizeTask = new Task<string | null>();
    this.authorizeTask.promise = new Promise<string | null>(
      (resolve, reject) => {
        this.authorizeTask!.onfulfilled = resolve;
        this.authorizeTask!.onrejected = reject;

        // start the OAuth consent flow by recording user identifier
        // addon host server will need server will need
        // to read in its OAuth implementation
        const cookieContent = `${this.cookie.name}=${
          runtime.userIdentifier
        };Secure;SameSite=None;Path=/;Domain=${
          this.cookie.domain
        };max-age:${
          this.cookie.maxAge
        }`;

        // user identifier goes to cookie to enable addon oauth server
        // linking the outreach user with the addon external identity.
        document.cookie = cookieContent;

        authService.openPopup();
      }
    );

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      message: '[CXT][AddonSdk]::authenticate-starting authorize promise',
      level: LogLevel.Debug,
      context: []
    });

    return this.authorizeTask!.promise;
  };

  /**
   *
   * Tries to obtain valid Outreach API token first by checking the local cache
   * and then by asking addon host if it can produce a new access token from its own cache
   * or by using previously obtained refresh token.
   *
   * @see https://github.com/getoutreach/clientxtsdk/blob/master/docs/outreach-api.md#token-endpoint
   *
   * @memberof AddonsSdk
   */
  public getToken = async (skipCache?: boolean): Promise<string | null> => {
    await this.verifySdkInitialized();

    if (!skipCache) {
      const cachedToken = await tokenService.getCachedTokenAsync();
      if (cachedToken) {
        return cachedToken;
      }
    }

    return await tokenService.fetchTokenAsync();
  };

  public sendMessage<T extends AddonMessage> (message: T, logged?: boolean) {
    if (!runtime.origin) {
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
        context: [postMessage, runtime.origin]
      });
    }

    window.parent.postMessage(postMessage, runtime.origin);
  }

  private verifySdkInitialized = async () => {
    // check if sdk.init() was called
    if (!this.initTask) {
      const error = '[CXT] Please initialize SDK by calling sdk.init() before performing any additional calls';
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        messageType: AddonMessageType.INIT,
        level: LogLevel.Error,
        message: error,
        context: [runtime.origin]
      });

      // throw an error - case is THAT important
      throw new Error(error);
    }

    // check if sdk.init() was resolved
    await this.initTask
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
        this.resolveInitPromise(context);
        this.onInit(context);
        break;
      }
      case AddonMessageType.CONNECT_AUTH_TOKEN:
        this.handleRefreshTokenMessage(addonMessage as ConnectTokenMessage);
        break;
      case AddonMessageType.READY:
      case AddonMessageType.REQUEST_DECORATION_UPDATE:
      case AddonMessageType.REQUEST_NOTIFY:
      case AddonMessageType.REQUEST_RELOAD:
        this.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[CXT][AddonSdk] :: onReceived - Client event ${addonMessage.type} received from host (ERROR)`,
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)]
        });
        break;
      default:
        this.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[CXT][AddonSdk] :: onReceived - Unknown event type: ${addonMessage.type}`,
          level: LogLevel.Warning,
          context: [JSON.stringify(addonMessage)]
        });
    }
  };

  private resolveInitPromise = (cxt: OutreachContext) => {
    window.clearTimeout(this.initTimer);
    if (this.initTask) {
      this.initTask.onfulfilled(cxt)
    }
  }

  private preprocessInitMessage = (initMessage: InitMessage) => {
    runtime.locale = initMessage.locale;
    runtime.theme = initMessage.theme;
    runtime.userIdentifier = initMessage.userIdentifier;
    runtime.manifest = initMessage.manifest;
    runtime.configuration = initMessage.configuration;

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
        `origin: ${runtime.origin || 'N/A'}`
      ]
    });
  };

  private handleRefreshTokenMessage = (tokenMessage: ConnectTokenMessage) => {
    tokenService.cacheToken({
      value: tokenMessage.token,
      expiresAt: tokenMessage.expiresAt
    });

    if (this.authorizeTask) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        message: '[CXT][AddonSdk]::onReceived-Resolving authorize promise',
        level: LogLevel.Debug,
        context: []
      });
      if (tokenMessage.token) {
        this.authorizeTask.onfulfilled(tokenMessage.token);
      } else {
        this.authorizeTask.onrejected('No token value received');
      }
    } else {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        message: `[CXT][AddonSdk] ::onReceived - Client event ${tokenMessage.type} received without promise to resolve`,
        level: LogLevel.Warning,
        context: [JSON.stringify(tokenMessage)]
      });
    }
  };

  private getAddonMessage = (
    messageEvent: MessageEvent
  ): AddonMessage | null => {
    if (!messageEvent) {
      return null;
    }

    const hostOrigin = utils.validHostOrigin(messageEvent.origin, this.logger);
    const connectOrigin = utils.validConnectOrigin(messageEvent.origin, this.logger);
    if (!hostOrigin && !connectOrigin) {
      this.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message:
          '[CXT][AddonSdk]::getAddonMessage - invalid origin',
        context: [
          messageEvent.origin,
          `host:${hostOrigin}`,
          `connect:${connectOrigin}`
        ]
      });
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

    if (!runtime.origin) {
      const initializedOrigin = this.initializeOrigin(hostMessage, messageEvent);
      if (!initializedOrigin) {
        this.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Trace,
          message:
            '[CXT][AddonSdk]::getAddonMessage - origin not initialized',
          context: []
        });
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

    if (!utils.validHostOrigin(messageEvent.origin, this.logger)) {
      return null;
    }

    this.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      level: LogLevel.Debug,
      message: '[CXT][AddonSdk]::getAddonMessage- setting origin',
      context: [messageEvent.origin]
    });

    runtime.origin = messageEvent.origin;
    return runtime.origin;
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
