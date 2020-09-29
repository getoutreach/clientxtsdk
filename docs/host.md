<!-- omit in toc -->
# Addon host

Table of content

- [Query parameters](#query-parameters)
  - [404 (NOT FOUND)](#404-not-found)
  - [302 (FOUND)](#302-found)
  - [200 (OK)](#200-ok)
- [Authentication](#authentication)
  - [Manifest scopes](#manifest-scopes)
  - [Setup Outreach OAuth application](#setup-outreach-oauth-application)
  - [Initial authentication flow](#initial-authentication-flow)
    - [User consent](#user-consent)
    - [Authorization code handling](#authorization-code-handling)
    - [Caching the tokens](#caching-the-tokens)
    - [Passing back access token to addon](#passing-back-access-token-to-addon)
  - [Refresh token flow](#refresh-token-flow)

In order for a web page of addon creator to be able to integrate with the Outreach app, that page has to support certain integration enabling features.

There are two major integration features addon host has to support:

- Query parameters parsing
- Authentication support

## Query parameters

Any time when the Outreach app loads an addon, it will fetch it from the URL created out of:

- host.URL value defined in the manifest (e.g., https://addon-host.com/outreach)
- query parameters representing context values of context properties also defined in the manifest (e.g. "opportunity.id")
- query params which are always sent regardless of the manifest (e.g., locale='en', theme='light' or uid='{sha256(user.id)}' etc.) 

That's how the resulting URL which Outreach will set as a source of iframe will be something like this:

```http
    https://addon-host.com/outreach?locale=en&uid=a1234&opportnity.id=123456
```

On the addon hosting side, when the addon loading request comes, the addon has to parse out of request query parameter values and return some of the possible responses.

### 404 (NOT FOUND)

In case the addon determines that, with a received set of parameters, there is nothing to be shown, it will return **404 (NOT FOUND)** response, and the Outreach app will not load the addon in that case.

### 302 (FOUND)

In case the request URL has a **"code"** query parameter value, the addon host goes through the initial auth flow of obtaining access token and, as a result, will send a 302 status code as described in [Passing back access token](#passing-back-access-token-to-addon) section.

In case the addon host has cached refresh token for a given uid, it will go through the [refresh token flow](#refresh-token-flow) and, as a result, in the end, it will send a same 302 status code as described in [Passing back access token](#passing-back-access-token-to-addon) section.

### 200 (OK)

In case when none of the 302 and 404 and cases are eligible, the addon host uses the received values initialize the addon in a proper state and return it back as **200 (OK)** response with the addon page content.

## Authentication

If an addon needs to make an impersonalized call to Outreach API  in the context of the current Outreach user, the addon host needs to implement authentication support. If that is not the case, authentication support can be omitted and left not implemented.

**How it works?**

All [Outreach API](https://api.outreach.io/api/v2/docs#authentication) requests must be authenticated with a token in the request's HTTP Authorization header.
To enable obtaining of that token, Outreach API supports OAuth flow where the Outreach user needs to consent for giving API access rights with the scopes defined in the addon manifest. Once a user consent to that, a short-lived authorization token will be sent to the addon host, which then uses it with its app secret and the key to obtaining the user access token, which then can be used to access Outreach API in the context of a user who granted those rights.

There are a few things addon host needs to implement for supporting the authentication scenario:

### Manifest scopes

In order for the addon to be OAuth enabled, it needs to have a list of required API scopes listed in the [manifest scopes section](#scopes). Those manifest scopes will be review as a part of the Outreach addon review process. They will also be presented to the Outreach user, and he will need to provide his consent with addon having those permissions on Outreach API when performing requests in his name.

### Setup Outreach OAuth application

You will need to create a dedicated Outreach OAuth application for your addon and to achieve that, please contact platform@outreach.io for assistance.
With that addon OAuth application created, you will have:

- application identifier
- application secret
- redirect URI

The redirect URI has to be the same as the addon host URL defined in the manifest.

### Initial authentication flow

#### User consent

On a first load of the addon when addon sdk will invoke [addonSdk.getToken()](#obtaining-an-access-token), and the Outreach user will be shown an OAuth screen where he will be asked to approve access with requested scopes.

[INSERT OAUTH SCREEN HERE]

Once a user consents on this screen, the result will be a request made to 
REDIRECT_URI address with a single additional parameter "code" containing short-lived authorization token. 

#### Authorization code handling

As described in [Outreach API documentation](https://api.outreach.io/api/v2/docs#authentication), the addon host has to use authorization code with application id and the secret to obtaining a token.

Request

```http
curl https://api.outreach.io/oauth/token
  -X POST
  -d client_id=<Application_Identifier>
  -d client_secret=<Application_Secret>
  -d redirect_uri=<Application_Redirect_URI>
  -d grant_type=authorization_code
  -d code=<Authorization_Code>
  ```

The response will contain all the data needed for accessing the token.

```json
{
  "access_token": <Access_Token>,
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": <Refresh_Token>,
  "scope": <Scope1+Scope2+Scope3>,
  "created_at": 1503301100
}
```

#### Caching the tokens

Now when the addon host has obtained this data, it needs to store somewhere access and refresh tokens of this user, so later, when the user loads addon again, it could generate a new access token without forcing the user to go through [user consent](#user-consent) phase.

In order to implement that caching, the addon host has to read a value stored in a request ["cxt-temp" auth cookie](#auth-temp-cookie), which contains a unique identifier of a user and cache received access and refresh tokens linked to that user id.

#### Passing back access token to addon

Now when the addon host obtained the access token and cached the refresh token, it needs to send the token back the addon, so the addon can perform Outreach API calls using this token.

In order to do that, the addon host has to respond to the original request, with a [302 Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) status code with the [Location header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location) with value defined like this
 
 ``` http
 {REQUEST_URL} + "&token=<ACCESS_TOKEN>&expiresAt=<EXPIRES_AT>"
```

- REQUEST_URL - it is the complete URL of the request to addon host
- ACCESS_TOKEN - it is the value of the access token retrieved from the Outreach API
- EXPIRES_AT - it is the value of expiration of the access token retrieved from Outreach API

### Refresh token flow

As described in [manifest host.auth endpoint](#auth-endpoint) section, if addon wants to support Outreach API access it has to implement additional endpoint which will support refresh token flow. The purpose of this endpoint is to be used as API endpoint which will return only a new token info if possible without any content etc.

When called, this endpoint will be called with a UID query parameter containing a unique user id value (same one as used in [caching the tokens](#caching-the-tokens) section) and endpoint implementation has to check if it has previously cached tokens for that given user id.

If there is a cached **access token** and it still didn't expire, the addon host should just return back the 200 OK result with payload containing token and expirationAt values.

If there is a cached **refresh token**, it will use that refresh token to obtain a new version of the application token as described in [Outreach API documentation](https://api.outreach.io/api/v2/docs#authentication)

Request (with a refresh token, application id, and secret)

```http
curl https://api.outreach.io/oauth/token
  -X POST
  -d client_id=<Application_Identifier>
  -d client_secret=<Application_Secret>
  -d redirect_uri=<Application_Redirect_URI>
  -d grant_type=refresh_token
  -d refresh_token=<Refresh_Token>
```

Response

```json
{
  "access_token": <Access_Token>,
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": <Refresh_Token>,
  "scope": <Scope1+Scope2+Scope3>,
  "created_at": 1503308300
}
```

Once this is received, the addon host should [cache the tokens](#caching-the-tokens) and then just return back the **200 (OK)** result with payload containing token and expirationAt values.

In case addon host is not having any cached token information and thus it can not obtain access token, it will return **404 (NOT FOUND)** status code.