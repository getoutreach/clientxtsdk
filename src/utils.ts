// eslint-disable-next-line no-unused-vars
import { ContextParam } from './context/ContextParam';

export class utils {
    /**
     * Tokenize url by replacing all token placeholders with matching context params.
     *
     * @memberof utils
     */
    public static tokenizeUrl = (url: string, params: ContextParam[])
    : {
        url: string,
        params: ContextParam[]
    } => {
      const tokenizer = /{(.*?)}/g
      let token = tokenizer.exec(url);
      while (token) {
        if (!token) {
          break;
        }
        const key = token[1];
        const tokenParam = params.find(p => p.key.toString() === key);
        if (tokenParam) {
          url = url.replace(`{${key}}`, tokenParam.value);
          params = params.filter(p => p !== tokenParam);
        }

        token = tokenizer.exec(url);
      }

      return {
        url,
        params
      };
    }

    /**
     * Paramaterize url by appending context params to the url parameters.
     *
     * @static
     * @memberof utils
     */
    public static parameterizeUrl = (url: string, params: ContextParam[])
    : string => {
      const hostUrl = new URL(url);

      const hostParams = new URLSearchParams(hostUrl.searchParams);
      params.forEach(param => hostParams.append(param.key, param.value));
      const hostParamsString = hostParams.toString();

      return `${utils.getUrlDomain(hostUrl)}${hostUrl.pathname}?${hostParamsString}`;
    }

    public static getUrlDomain = (url: URL): string => {
      let originHost = `${url.protocol}//${url.hostname}`;

      if (url.port && url.port !== '443') {
        originHost += `:${url.port}`;
      }

      return originHost;
    };
}
