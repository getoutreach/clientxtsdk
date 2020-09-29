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