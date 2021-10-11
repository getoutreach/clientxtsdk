// eslint-disable-next-line no-unused-vars
import { ContextParam } from './context/ContextParam';
import runtime from './sdk/RuntimeContext';
import { ILogger, EventOrigin, EventType, LogLevel } from '.';

export class utils {
  /**
   * Tokenize url by replacing all token placeholders with matching context params.
   *
   * @memberof utils
   */
  public static tokenizeUrl = (
    url: string,
    params: ContextParam[]
  ): {
    url: string;
    params: ContextParam[];
  } => {
    const tokenizer = /{(.*?)}/g;
    let token = tokenizer.exec(url);
    while (token) {
      if (!token) {
        break;
      }
      const key = token[1];
      const tokenParam = params.find((p) => p.key.toString() === key);
      if (tokenParam) {
        url = url.replace(`{${key}}`, tokenParam.value);
        params = params.filter((p) => p !== tokenParam);
      }

      token = tokenizer.exec(url);
    }

    return {
      url,
      params,
    };
  };

  /**
   * Parameterize url by appending context params to the url parameters.
   *
   * @static
   * @memberof utils
   */
  public static parameterizeUrl = (
    url: string,
    params: ContextParam[]
  ): string => {
    const hostUrl = new URL(url);

    const hostParams = new URLSearchParams(hostUrl.searchParams);
    params.forEach((param) => hostParams.append(param.key, param.value));
    const hostParamsString = hostParams.toString().replace('=&', '&');

    return `${utils.getUrlDomain(hostUrl)}${
      hostUrl.pathname
    }?${hostParamsString}${hostUrl.hash}`;
  };

  public static getUrlDomain = (url: URL): string => {
    let originHost = `${url.protocol}//${url.hostname}`;

    if (url.port && url.port !== '443') {
      originHost += `:${url.port}`;
    }

    return originHost;
  };

  public static validHostOrigin = (
    origin: string,
    logger: ILogger
  ): boolean => {
    if (!origin) {
      return false;
    }
    const valid =
      origin.endsWith('outreach.io') ||
      origin.endsWith('outreach-staging.com') ||
      origin.endsWith('outreach-dev.com');

    if (!valid) {
      logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message: '[CXT][AddonSdk]::validHostOrigin - invalid origin',
        context: [],
      });
      return false;
    }

    return true;
  };

  public static validConnectOrigin = (
    origin: string,
    logger: ILogger
  ): boolean => {
    if (!origin) {
      return false;
    }

    if (!runtime.manifest) {
      return false;
    }

    if (!runtime.manifest.api) {
      logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message: '[CXT][AddonSdk]::connectOrigin - no manifest api',
        context: [],
      });
      return false;
    }

    // connect endpoint is posting a message with token to addon so it is valid origin
    // see: https://github.com/getoutreach/clientxtsdk/blob/master/docs/outreach-api.md#connect-endpoint
    const connectUri = new URL(runtime.manifest.api.connect);
    const connectOrigin = utils.getUrlDomain(connectUri);
    const connectMessage = origin === connectOrigin;
    if (!connectMessage) {
      logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message:
          '[CXT][AddonSdk]::connectOrigin - invalid connect origin received',
        context: [origin, connectOrigin],
      });
      return false;
    }

    return true;
  };

  public static objectValues = (data: any) => {
    return Object.keys(data).map((key) => data[key]);
  };
}
