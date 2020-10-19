<!-- omit in toc -->
# Add-on SDK

Table of content

- [Summary](#summary)
- [Addon initialization](#addon-initialization)
  - [Init event handler](#init-event-handler)
    - [Outreach context](#outreach-context)
  - [Info event handler (optional)](#info-event-handler-optional)
  - [Ready function](#ready-function)
- [Additional addon functions](#additional-addon-functions)
  - [Notify function](#notify-function)
  - [Decorate function](#decorate-function)
- [Add-on authentication](#add-on-authentication)
  - [getToken function](#gettoken-function)
  - [authorize function](#authorize-function)

## Summary

The outreach host is using iframes to load addons due to security and performance reasons. Once an addon is loaded, the Outreach host communicates with it using POST messages.

Outreach client extensibility SDK is created as a thin wrapper around this communication, so the addon creator doesn't need to think about how this is implemented, but in case you would prefer your own integration library, that is totally OK too.

The code from this repository is packaged into an NPM package, which can be found here.

```http
https://www.npmjs.com/package/@outreach/client-addon-sdk
```

In case you don't want to use the NPM package, we are also publishing it as a javascript bundle on Outreach CDN, so you can just reference it on your Html page using a standard script tag.

## Addon initialization

In order for the addon to get into initialized state, there are a few simple steps to be performed on the addon host page:

- Subscribe to an [initialization event](#init-event-handler)
- Subscribe to [info event](#info-event-handler-optional)(optional)
- Invoke a [READY function](#ready-function).

### Init event handler

The Outreach host sends to addon contextual information of the current Outreach user loading the addon, which triggers on addon side init event handler. In case the initialization context changes after the addon are loaded, another Init message will be sent to the addon so it can reinitialize itself with the new context.

The manifest Context section determines the payload of the initialization context (e.g., if there is Opportunity scope defined, the initialization context will contain current opportunity information).

```javascript
addonSdk.onInit = (ctx: OutreachContext) => {
    // addon initialization based on this values
}
```

This event handler is invoked once on initial addon loading and every time after that when the initialization context
of Outreach context changes.

#### Outreach context

[Outreach context](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/OutreachContext.ts) sent to onInit method has next properties:

- locale - Outreach User locale to be used for rendering addon UI (e.g. en)
- theme - Outreach app theme to be used for rendering addon UI (e.g. light)
- account - [Information about current account](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/AccountContext.ts) Outreach user is looking at (optional)
- user - [Information about current outreach user](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/UserContext.ts) Outreach user is looking at (optional)
- opportunity - [Information about current opportunity](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/OpportunityContext.ts) Outreach user is looking at (optional)
- prospect - [Information about current prospect](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/ProspectContext.ts) Outreach user is looking at (optional)
- config - User-specific [addon configuration](configuration.md#) (if any)

### Info event handler (optional)

To support the case when the addon developer is interested in getting information on internal SDK events, we have added an optional onInfo handler, which by default, will be invoked every time when there is an error in SDK.

 ```javascript
addonSdk.onInfo = (info: AddonInfo) => {
    // addon process the message
}
```

In case there is a need for observing other types of events, addonSdk defines a logLevel property that can be set to one of the enum values.
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

To support addons needing Outreach API access, addon SDK implements two actions: getToken() and authorize()

### getToken function

[source here](https://github.com/getoutreach/clientxtsdk/blob/master/src/index.ts#L254)

This function addon calls anytime it needs a token to access Outreach API - no need to tie it to any user generated action (e.g. button click) as there are no popups

```javascript
    addonSdk.getToken = (skipCache?: bool) => Promise<string> {
        ...
    }
```

This function will:

- check if local storage has item with key **cxt-sdk-token**
- it will check if the cached access token didn't expire
- if cached token is still active the promise will resolve and addon creator will get a token.

Suppose a valid access token is not in the local storage.

In that case, function will call the [token endpoint](outreach-api.md#token-endpoint) and try to obtain new access token, cache it to local storage and return it to user resolving the promise.

### authorize function

[source here](https://github.com/getoutreach/clientxtsdk/blob/master/src/index.ts#L211)

```javascript
    addonSdk.authenticate= () => Promise<string> {
        ...
    }
```

If a sdk.getToken() function fails, addon creator has to show some clickable element ("Login button"). Once a user clicks that button, a [Outreach OAuth consent popup](outreach-api.md#outreach-api-consent) will be shown to user and a [authorize endpoint](outreach-api.md##authorization-endpoint) will be called. Authorize flow will [cache on server refresh token](outreach-api.md#caching-the-tokens) and on client local storage access token so future getToken() calls will work and there won't be no need to show popup to user again.

In case addon creator will call authorize() function after user provided content, Outreach user will briefly see a popup being loaded and immediately closed after a very breif period.

An important implementation detail of this function is that before a popup is shown, sdk will create a cookie called "ctx-sdk-token" where user identifier will be stored so the addon host can read that value later for [caching tokens](outreach-api.md#caching-the-tokens) implementation.
