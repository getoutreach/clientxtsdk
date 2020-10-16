import { Token } from '../sdk/Token';
import runtime from '../sdk/RuntimeContext';

import addonSdk, { Constants } from '../index';
import { LogLevel } from '../sdk/LogLevel';
import { EventType } from '../sdk/EventType';
import { EventOrigin } from '../sdk/EventOrigin';

class TokenService {
  public fetchTokenAsync = async (): Promise<string | null> => {
    if (!runtime.api) {
      throw new Error(
        "This addon manifest is not having api definition so token can't be retrieved"
      );
    }

    // 2. try to refresh a token
    const refreshedToken = await this.getRefreshedTokenAsync();
    if (refreshedToken) {
      localStorage.setItem(
        Constants.AUTH_TOKEN_CACHE_KEY,
        JSON.stringify(refreshedToken)
      );
      return refreshedToken.value;
    }

    return null;
  };

  public getCachedTokenAsync = (): Promise<string | null> => {
    if (!runtime.api) {
      throw new Error(
        "This addon manifest is not having api definition so token can't be retrieved"
      );
    }
    // 1. check the local cache for valid token
    var cachedToken = localStorage.getItem(Constants.AUTH_TOKEN_CACHE_KEY);
    if (cachedToken) {
      try {
        const token = JSON.parse(cachedToken) as Token;
        if (token.expiresAt > Date.now()) {
          return Promise.resolve(token.value);
        } else {
          addonSdk?.logger.log({
            origin: EventOrigin.ADDON,
            type: EventType.INTERNAL,
            level: LogLevel.Debug,
            message: 'Cached token had expired',
            context: [
              `expiresAt:${token.expiresAt}`,
              `date.now:${Date.now()}`
            ]
          });
        }
      } catch (e) {
        addonSdk?.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Error,
          message: 'Invalid cached token value:' + cachedToken,
          context: [JSON.stringify(e)]
        });
      }
    }

    return Promise.resolve(null);
  };

  public cacheToken = (token: Token) => {
    addonSdk?.logger.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      level: LogLevel.Debug,
      message: 'New token value stored in cache',
      context: [JSON.stringify(token)]
    });
    localStorage.setItem(Constants.AUTH_TOKEN_CACHE_KEY, JSON.stringify(token));
  }

  private getRefreshedTokenAsync = async (): Promise<Token | null> => {
    if (!runtime.api) {
      return Promise.resolve(null);
    }

    try {
      const r = await fetch(runtime.api.token, {
        method: 'POST',
        // TODO: nimal, 8.10.2020 - xt-74 token endpoint authentication
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: runtime.userIdentifier
        })
      });

      if (!r.ok) {
        addonSdk?.logger.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: r.status === 404 ? LogLevel.Debug : LogLevel.Error,
          message: 'Token fetch failed',
          context: [
            `status:${r.status}`,
            `statusText:${r.statusText}`
          ]
        });
        return Promise.resolve(null);
      }

      return (await r.json()) as Token;
    } catch (e) {
      addonSdk?.logger.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Error,
        message: 'Refresh token fetch failed with an error',
        context: [JSON.stringify(e)]
      });
      return Promise.resolve(null);
    }
  };
}

export default new TokenService();
