import { Token } from '../sdk/Token';
import runtime from '../sdk/RuntimeContext';

class TokenService {
  private AUTH_TOKEN_CACHE_KEY = 'ctx-sdk-token';

  public getTokenAsync = async (skipCache?: boolean): Promise<string | null> => {
    if (!runtime.api) {
      throw new Error(
        "This addon manifest is not having api definition so token can't be retrieved"
      );
    }

    // 1. check the local cache for valid token
    if (!skipCache) {
      const cachedToken = await this.getCachedTokenAsync();
      if (cachedToken) {
        return cachedToken;
      }
    }

    // 2. try to refresh a token
    const refreshedToken = await this.getRefreshedTokenAsync();
    if (refreshedToken) {
      localStorage.setItem(this.AUTH_TOKEN_CACHE_KEY, JSON.stringify(refreshedToken));
      return refreshedToken.value;
    }

    return null;
  };

  private getCachedTokenAsync = (): Promise<string | null> => {
    var cachedToken = localStorage.getItem(this.AUTH_TOKEN_CACHE_KEY);
    if (cachedToken) {
      try {
        const token = JSON.parse(cachedToken) as Token;
        if (token.expiresAt > Date.now()) {
          return Promise.resolve(token.value);
        }
      } catch (e) {
        // TODO: nimal, 8.10.2020 - report this to rollbar?
        console.error('Invalid cached token value', cachedToken);
      }
    }

    return Promise.resolve(null);
  };

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
          'outreach-user-id': runtime.userIdentifier
        }
      });

      if (!r.ok) {
        return Promise.resolve(null);
      }

      return await r.json() as Token;
    } catch (e) {
      console.error(e);
      return Promise.resolve(null);
    }
  };
}

export default new TokenService();
