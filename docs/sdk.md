<!-- omit in toc -->
# Add-on SDK

Table of content

- [Summary](#summary)
- [Addon initialization](#addon-initialization)
  - [Define log level (optional)](#define-log-level-optional)
  - [Load event handler](#load-event-handler)
  - [Sdk initialization](#sdk-initialization)
    - [Outreach context](#outreach-context)
- [Additional addon function](#additional-addon-function)
  - [Notify function](#notify-function)
  - [Decorate function](#decorate-function)
  - [Navigate function](#navigate-function)
  - [Environment function](#environment-function)
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

- Define log level [log level](#define-log-level-optional) (optional)
- Subscribe to [load event](#load-event-handler-optional)
- Sdk [initialization](#sdk-initialization).

### Define log level (optional)

In case there is a need for observing other types of events, addonSdk defines a logLevel property that can be set to one of the enum values.
None| Debug  | Info | Warn | Error.

```javascript
addonSdk.logLevel = LogLevel.Debug;
```

Default value is **Error** which means that only error logs will be sent to addon using sdk. 

### Load event handler

Load handler is being invoked after the addon is fully loaded, and it provides to addon creator performance information on addon loading.

Default implementation would show a warning toast if addon loading times were longer than 2 seconds and error toast if loading times were longer then 5 seconds.

Addon creator is encouraged to implement its load handler and handle the received performance data differently (report it to its telemetry service, show a custom addon UI, etc.)

To support the case when the addon developer is interested in getting information on internal SDK events, we have added an optional onInfo handler, which by default, will be invoked every time when there is an error in SDK.

 ```javascript
addonSdk.onLoad = (ctx: LoadingContext) => {
    // show custom UI, report to telemetry
}
```

### Sdk initialization

The Outreach host sends to addon contextual information of the current Outreach user loading the addon, which triggers on addon side init event handler.

The manifest Context section determines the payload of the initialization context (e.g., if there is an Opportunity scope defined, the initialization context will contain current opportunity information).

To retrieve the Outreach initialization context, sdk needs to initialize

```javascript
// cxt: OutreachContext
  const cxt = await addonSdk.init(); 

```

This will result in an iframe post message being sent to the host informing the Outreach app that the addon is ready to receive initialization context describing the current Outreach user loading the addon.

Once the initialization context is received, sdk is ready to perform its functionality.

#### Outreach context

[Outreach context](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/OutreachContext.ts) sent to onInit method has next properties:

- locale - Outreach User locale to be used for rendering addon UI (e.g. en)
- theme - Outreach app theme to be used for rendering addon UI (e.g. light)
- account - [Information about current account](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/AccountContext.ts) Outreach user is looking at (optional)
- user - [Information about current outreach user](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/UserContext.ts) Outreach user is looking at (optional)
- opportunity - [Information about current opportunity](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/OpportunityContext.ts) Outreach user is looking at (optional)
- prospect - [Information about current prospect](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/ProspectContext.ts) Outreach user is looking at (optional)
- config - User-specific [addon configuration](configuration.md#) (if any)
- host - [Information about the addon hosting environment](https://github.com/getoutreach/clientxtsdk/blob/master/src/context/HostContext.ts) including all the of the url parameters defined in manifest host url and in browser location search params.

## Additional addon function

Add-on sdk has a few additional functions allowing to addon to request a certain action to be performed by a host. Using these functions is optional, and it is OK if the addon creator decides not to use them.

### Notify function

In case when an addon wants to inform the Outreach user about some information, warning, or Error, it will need to invoke the Notify function requesting from an Outreach app to notify the user about that.

```javascript
addonSdk.notify({type: ‘info’, text:’Saved!’);
```

The Outreach host will notify the user in a way consistent with the Outreach application UX.

### Decorate function

In case when an addon would like to update its decoration of the addon entry point (e.g., Tab title), it will need to invoke the Decorate function requesting from an Outreach app to update its entry point decoration.

Currently, there are two supported decoration update types: text and badge.

To update the text decoration of addon entry point, you can use one of this calls:

```javascript
addonSdk.decorate('Messages (2)');

or

addonSdk.decorate('Messages (2)', 'text');
```

To update the badge representation of addon entry point:

```javascript
  addonSdk.decorate('2', 'badge');
```

To clear the badge representation of addon entry point:

```javascript
  addonSdk.decorate('', 'badge');
```

### Navigate function

Sometimes, in reaction to user interaction, an addon needs to navigate a different part of the Outreach application.

At this moment, SDK supports redirecting to Opportunity, Prospect, and Account, but we plan to add more navigation destinations based on SDK user feedback. 

To encapsulate the Outreaching routing code's internals and enable client-side navigation without the need for a full page reload, sdk provides a navigate function.

For example, to navigate addon iframe to an opportunity with id 123

```javascript
addonSdk.navigate(NavigationDestination.OPPORTUNITY, '123’);
```

Id parameter can contain additional navigation information besides the entity id.

For example, to navigate to an opportunity with id 123 open with Tasks tab selected.

```javascript
addonSdk.navigate(NavigationDestination.OPPORTUNITY, '123/tasks’);
```

To add query parameters to the navigation destination, pass them with the optional params parameter

For example, to navigate addon iframe to an opportunity with id 123 and wanting to append ?abc=1&xyz=2

```javascript
addonSdk.navigate(NavigationDestination.OPPORTUNITY, '123’, { 'abc': '1', 'xyz': '2' });
```

### Environment function

Every addon can have some requirements from the Outreach host, which are needed for the addon's proper functioning.

e.g., A tab addon might want the right sidebar to be removed so it could get more screen space

This requirement can be express in its [manifest host environment section](manifest.md#environment), and then it would be applied when the addon initially loads.

In order to support the need for the addon creator to change the environment at a later point (e.g., to show the right sidebar at some point) while the addon is active, sdk has an environment function to support that.

e.g. to show the sidebar for tab addons

```javascript
addonSdk.environment({ fullWidth: false });
```

e.g. to hide the sidebar for tab addons

```javascript
addonSdk.environment({ fullWidth: true });
```

## Add-on authentication

To support addons needing Outreach API access, addon SDK implements two actions: getToken() and authorize()

### getToken function

[source here](https://github.com/getoutreach/clientxtsdk/blob/master/src/index.ts#L254)

This function addon calls anytime it needs a token to access Outreach API - no need to tie it to any user-generated action (e.g., button click) as there are no popups.

```javascript
    addonSdk.getToken = (skipCache?: bool) => Promise<string> {
        ...
    }
```

This function will:

- check if local storage has an item with key **cxt-sdk-token**
- it will check if the cached access token didn't expire
- if the cached token is still active, the promise will resolve, and the addon creator will get a token.

Suppose a valid access token is not in the local storage.

In that case, the function will call the [token endpoint](outreach-api.md#token-endpoint) and try to obtain a new access token, cache it to local storage and return it to the user resolving the promise.

### authorize function

[source here](https://github.com/getoutreach/clientxtsdk/blob/master/src/index.ts#L211)

```javascript
    addonSdk.authenticate= () => Promise<string> {
        ...
    }
```

If a sdk.getToken() function fails, addon creator has to show some clickable element ("Login button"). Once a user clicks that button, a [Outreach OAuth consent popup](outreach-api.md#outreach-api-consent) will be shown to user and a [authorize endpoint](outreach-api.md##authorization-endpoint) will be called. Authorize flow will [cache on server refresh token](outreach-api.md#caching-the-tokens) and on client local storage access token so future getToken() calls will work and there won't be any need to show popup to the user again.

In case of an addon, the creator will call authorize() function after user-provided content. Outreach users will briefly see a popup being loaded and immediately closed after a very brief period.

An important implementation detail of this function is that before a popup is shown, sdk will create a cookie called "cxt-sdk-token" where the user identifier will be stored so the addon host can read that value later for [caching tokens](outreach-api.md#caching-the-tokens) implementation.
