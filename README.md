# Outreach client extensibility SDK

This document contains all the information a developer needs to create an Outreach addon.

In case you have any questions/comments/concerns about the extensibility, please email us at cxt-sdk@outreach.io.

## What is in this document?

- [Outreach client extensibility SDK](#outreach-client-extensibility-sdk)
  - [What is in this document?](#what-is-in-this-document)
  - [How it works](#how-it-works)
  - [How the development process looks like?](#how-the-development-process-looks-like)
  - [How much coding is needed?](#how-much-coding-is-needed)
- [Manifest file](#manifest-file)
  - [Basic manifest properties](#basic-manifest-properties)
    - [identifier](#identifier)
    - [store](#store)
    - [title](#title)
    - [description](#description)
    - [host](#host)
      - [type (host)](#type-host)
      - [url](#url)
      - [icon](#icon)
    - [author](#author)
  - [Integration manifest properties](#integration-manifest-properties)
    - [context](#context)
  - [api (optional)](#api-optional)
    - [token endpoint](#token-endpoint)
    - [scopes](#scopes)
  - [Uploading the manifest](#uploading-the-manifest)
- [Addon host](#addon-host)
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
- [Add-on SDK](#add-on-sdk)
  - [Addon initialization](#addon-initialization)
    - [Init event handler](#init-event-handler)
    - [Info event handler (optional)](#info-event-handler-optional)
    - [Ready function](#ready-function)
  - [Additional addon functions](#additional-addon-functions)
    - [Notify function](#notify-function)
    - [Decorate function](#decorate-function)
  - [Add-on authentication](#add-on-authentication)
    - [Auth temp cookie creation](#auth-temp-cookie-creation)
    - [Caching access token](#caching-access-token)
    - [Obtaining an access token](#obtaining-an-access-token)

## How it works

When Outreach user goes to a specific part of the Outreach application (e.g., opportunity page), the application will check if that user has installed opportunity addons and for each one of the installed opportunity addons:

- a tab will be added with the title of the addon
- an iframe will be added with the source pointing to a page where the addon is hosted
- Outreach application will send the current user contextual information to the addon so that the addon can initialize itself into a proper state.

## How the development process looks like?

The process of creating addon usually requires the next steps:

- The developer creates an addon page to be used by Outreach users,
- The developer creates a [manifest file](#manifest-file) describing the addon (including the URL of where the addon page is located)
- The manifest file gets [uploaded to the Outreach](#uploading-the-manifest), and the addon is visible only to a developer for dev/testing
- The developer [integrates the addon](#addon-integration)  with the Outreach client extensibility framework
- Once tested and approved, the developer makes the addon visible in the store to other Outreach users.
- 
##  How much coding is needed?

Every addon needs to have a web server that will serve the same web page surfacing addon functionality to Outreach users - **no coding needed** just to [create a manifest](#manifest-file). 

_Examples of such addon could be stateless addons (think: currency exchange calculator addon) or addons which will rely on its own ways to recognize the user (e.g., rely on the addon cookie saved from the previous attempt)_

Most of the addons will likely want to be initialized to the desired state for a given Outreach user, and to achieve that, the addon creator will have to simply **parse URL query parameter values on the addon host side** - probably an hour of work.

_An example of this will be an addon, which wants to initialize itself only once during the loading and from that moment, it works independently of the Outreach app._

Some of the addons will choose to be able to send and receive messages from the Outreach app, and in other to do that, the addon creator would have to integrate the Outreach SDK package by doing **a few lines of javascript code on the addon client-side** - probably a few hours of work.

_An example of this will be an addon which wants to show an information toast to the Outreach user or an addon which will want to know when Outreach application context changes (e.g., user switched to another prospect)._

Some of the addons will need access to Outreach API, and in order for that, addon creator will need to **upgrade their addon host code** to support the Outreach API authentication. This is the only non-trivial part for coding, but it is still not rocket science, so, with this document and our support, addon creator should probably be able to implement this in a day.

# Manifest file

Manifest is a simple JSON file that the addon developer uploads to Outreach and which contains all of the data needed for Outreach to host addon in an iframe.

Here is the sample manifest file of the hello world addon

```json
{
    "version": "0.10"
    "identifier": "addon-outreach-hello",
    "store": "public",
    "title":  [
        "en": "Hello world",
        "fr": "Salut tout le monde"
    ],
    "description": [
        "en": "This is a sample addon created as a guide for Outreach addon creators ",
        "fr": "Il s’agit d’un addon échantillon créé comme
               un guide pour les créateurs addon Outreach",
    ],
    "host": {
        "type": "tab-opportunity",
        "url": "https://addon-host.com/hello-world",
        "icon": "https://addon-host.com/icon.png"
    },
    "api": {
      "token": "https://addon-host.com/token",
      "scopes": "prospects.read, opportunity.read" ,
    }
    "context":  [ "user.id", "opportunity.id", "prospect.customField12" ],
    "author": {
        "websiteUrl": "https://addon-host.com",
        "privacyUrl": "https://addon-host.com/privacy",
        "termsOfUseUrl": "https://addon-host.com/tos",
    }
}
```

## Basic manifest properties

### identifier

Unique identifier of the addon as defined by the addon creator

### store

Defines the store in which addon will be served:

- **Public**
  
  The addon is going to be available in the addon store to all of the Outreach users.

- **Private**
  
 The addon is going to be available only internally for users of a company that created the addon.

- **Personal**
  
  The addon is going to be available only to a developer who uploaded the manifest.

### title

The localized addon title is shown in the addon store and Outreach app as a tab tile.

### description

A localized addon description is shown in the addon store to explain what the addon does and why someone would want to install it.

### host

#### type (host)

Outreach application supports different types of addons which can be loaded in different parts of the application.
Type property defines what the type of addon is and where it should be loaded.

_e.g **type: "tab-opportunity"** will result with addon being loaded as an additional tab on the Outreach opportunity page_

Supported addon types (we will expand this list as the time goes):

- tab-account
- tab-opportunity
- tab-prospect

#### url

Address where the addon hosting web page is hosted.


#### icon

base64 string represents the icon to be shown in the addon store and (if possible) in Outreach client.

### author

This section contains information to be presented to a user of the addon in the marketplace and on the consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.

## Integration manifest properties

### context

In this section, the addon author defines a list of predefined context information that addon needs from Outreach to be sent during the initialization process.
It is a string array of predefined Outreach properties describing attributes of the Outreach user loading the addon.

_e.g. ["opportunity.id", "account.id"]_

Outreach User will be asked to consent with sharing this information with the addon on the addon's first use.  If the future version of the manifest addon creator will add additional contextual fields, the Outreach user will consent again.

Here is the list of currently supported context information (we will add more):

- **account**: id, name, customId, custom1...custom100
- **user**: id, name, custom1 ... custom5
- **opportunity**: id, custom1...custom100,

## api (optional)

This section is optional - if addon doesn't need access to outreach API, this section can be omitted.

### token endpoint

Address of the endpoint, which will return support [refresh token flow](#refresh-token-flow). 

*In case addon doesn't need to access Outreach API, this section can be omitted.*

### scopes

(If the addon creator needs no API access, this section can be omitted.)

In the scopes section, the addon creator defines a list of Outreach API scopes which are needed for performing API calls addon needs to perform.

The list of scopes will be used for [Outreach API authentication](https://api.outreach.io/api/v2/docs#authentication "Outreach API authentication") where current Outreach user will be asked to consent for granting permissions for defined scopes to addon creator.

This list of scopes defined in the manifest will be reviewed during the addon approval process needed for an addon to be accepted in the addon store.

"Authorization scopes let you specify what type and level of access your application requires. Your OAuth application's scopes describe the possible set of values that may be requested. Still, the specific scopes requested during the authentication process are what will be applied to the resulting access token and used to restrict and permit application access.

Scopes are period-separated strings containing two parts: the first part is a pluralized resource name (e.g., prospects); the second part is a token — read, write, delete, or all — that describes the level of access permitted. For example, the scopes prospects.read and prospects.all would both grant access to read prospects, while only the latter would permit write and delete access. Scopes are not additive; the prospects.write scope does not grant read access."

## Uploading the manifest

Once the manifest file is created, it has to be uploaded to Outreach so it can be tested and optimized in the Outreach app.

At the moment, there are two ways you can upload the manifest:
emailing it support email cxt-sdk@outreach.io or by using the Outreach API to POST manifest file.

_In the near future, we will have a section in the Outreach application where you would be able to upload it using the application UI._

# Addon host

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

- [Define manifest scopes](#manifest-scopes)
- [Setup Outreach OAuth application](#setup-outreach-oauth-application)
- [Initial authentication flow](#initial-authentication-flow)
- [Refresh token flow](#refresh-token-flow)

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

# Add-on SDK

The outreach host is using iframes to load addons due to security and performance reasons. Once an addon is loaded, the Outreach host communicates with it using POST messages. 

Outreach client extensibility SDK is created as a thin wrapper around this communication, so the addon creator doesn't need to think about how this is implemented, but in case you would prefer your own integration library, that is totally OK too.

The code from this repository is packaged into an NPM package, which can be found here.

```http
https://www.npmjs.com/package/@outreach/client-addon-sdk
```

In case you don't want to use the NPM package, we are also publishing it as a javascript bundle on Outreach CDN so you can just reference it on your Html page using a standard script tag.

## Addon initialization

In order for the addon to get into initialized state, there are a few simple steps to be performed on the addon host page:

- Subscribe to an [initialization event](#init-event-handler)
- Subscribe to [info event](#info-event-handler-optional)(optional)
- Invoke a [READY function](#ready-function). 

### Init event handler

The Outreach host sends to addon contextual information of the current Outreach user loading the addon, which triggers on addon side init event handler. In case the initialization context changes after the addon are loaded, another Init message will be sent to the addon so it can reinitialize itself with the new context. 

The manifest Context section determines the payload of the initialization context (e.g., if there is Opportunity scope defined, the initialization context will contain current opportunity information).

```javascript
addonSdk.onInit = (ctx: Context) => {
    // addon initialization based on this values
}
```

This event handler is invoked once on initial addon loading and every time after that when the initialization context of Outreach context changes.

### Info event handler (optional)

To support the case when the addon developer is interested in getting information on internal SDK events, we have added an optional onInfo handler, which by default, will be invoked every time when there is an error in SDK.

 ```javascript
addonSdk.onInfo = (info: AddonInfo) => {
    // addon process the message 
}
```

In case there is a need for observing other types of events, addonSdk defines a logLevel property which can be set to one of the enum values
None| Debug  | Info | Warn | Error.

```javascript
addonSdk.logLevel = LogLevel.Debug;
```

### Ready function

Once all the handlers are defined, and as soon as possible, addon sends a message to the host that it is ready for initialization by directly calling the ready method.

```javascript
addonSdk.ready();
```

This will result in an iframe post message being sent to the host informing the Outreach app that the addon is ready to receive initialization context describing the current Outreach user loading the addon.

## Additional addon functions

Add-on sdk has a few additional functions allowing to addon to request a certain action to be performed by a host. Using these functions is optional, and it is OK if the addon creator decides not to use them.

### Notify function

In case when an addon wants to inform the Outreach user about some information, warning, or Error, it will need to invoke the Notify function requesting from an Outreach app to notify the user about that. 

```javascript
addonSdk.notify({type: ‘info’, text:’Saved!’);
```

The Outreach host will notify the user in a way consistent with the Outreach application UX.

### Decorate function 

In case when an addon would like to update its decoration of the addon entry point (e.g., Tab title), it will need to invoke the Decorate function requesting from an Outreach app to update its entry point decoration.

```javascript
addonSdk.decorate({text:’Messages (2)’);
```

## Add-on authentication

In order to support addons needing Outreach API access, addon SDK implements a few supporting features.

### Auth temp cookie creation

Every time when addon starts, it will read the uid query parameter and store it in a cookie called "ctx-temp", so the addon host can later read it when it is [caching the retrieved tokens](#caching-the-tokens).

*This is happening automatically without the need for any coding from the addon creator.*

### Caching access token

Every time when addon starts, it will also check for token and expiresAt parameters (as defined in [passing back](#pass)), and if the URL contains them, it will take those values and cache them locally in browser local storage and use them from there as long the token doesn't expire. 

*This is happening automatically without the need for any coding from the addon creator.*

### Obtaining an access token

Every time when addon creator wants to call Outreach API, it needs a valid access token, and to obtain it, addon SDK defines the getToken method.

```javascript
    addonSdk.getToken = (skipCache?: bool) => Promise<string> {
        ...
    }
```

If there is a **token in local storage** and the token didn't expire, the function just returns that token immediately.

If no valid access token in local cache, addon sdk will try to **refresh access token** by calling the [refresh token endpoint](#refresh-token-flow), cache it, and return it.

If the token refresh call will will fail to **obtain a new access token**, addon sdk will ask the Outreach host to start the authentication process, so the user will see the Outreach API OAuth consent screen, and the flow will go as described in [initial auth flow](#initial-authentication-flow) section. At the end of this initial auth flow, the addon will load again, but this time it will have a locally cached access token, and getToken() will this time resolve with a valid access token.

_if **skipCache** parameter is passed with true value, locally cached value will be ignored and new access token will be retrieved from server through refreshing or outreach user consrent flows._
