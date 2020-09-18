# Outreach client extensibility SDK
This document contains all the information a developer needs to create an Outreach addon.

In case you have any questions/comments/concerns about the extensibility, please email us at cxt-sdk@outreach.io.

## What is in this document?

- [Outreach client extensibility SDK](#outreach-client-extensibility-sdk)
  - [What is in this document?](#what-is-in-this-document)
  - [How it works?](#how-it-works)
  - [How to create an addon?](#how-to-create-an-addon)
- [Manifest file](#manifest-file)
  - [Basic manifest properties](#basic-manifest-properties)
    - [identifier](#identifier)
    - [type](#type)
    - [title](#title)
    - [description](#description)
    - [host](#host)
      - [type](#type-1)
      - [url](#url)
      - [icon](#icon)
    - [author](#author)
  - [Integration manifest properties](#integration-manifest-properties)
    - [context](#context)
    - [scopes](#scopes)
  - [Uploading the manifest](#uploading-the-manifest)
- [Addon integration](#addon-integration)
- [Simple integration](#simple-integration)
- [Full integration](#full-integration)
  - [Host communication](#host-communication)
    - [Addon initialization](#addon-initialization)
      - [Init event handler](#init-event-handler)
      - [Info event handler (optional)](#info-event-handler-optional)
      - [Ready function](#ready-function)
    - [Additional addon functions](#additional-addon-functions)
      - [Notify function](#notify-function)
      - [Decorate function](#decorate-function)
  - [API access](#api-access)
    - [How it works?](#how-it-works-1)
    - [What addon needs to do to support this?](#what-addon-needs-to-do-to-support-this)
    - [Onboard to Outreach API](#onboard-to-outreach-api)
    - [Addon host auth requirements](#addon-host-auth-requirements)
      - [Obtaining the access token](#obtaining-the-access-token)
      - [Caching the refresh token](#caching-the-refresh-token)
    - [Initial authentication flow](#initial-authentication-flow)

## How it works? 

When Outreach user goes to a specific part of the Outreach application (e.g., opportunity page), the application will check if that user has installed opportunity addons and for each one of the installed opportunity addons:
- a tab will be added with the title of the addon
- an iframe will be added with the source pointing to a page where the addon is hosted
- Outreach application will send the current user contextual information to the addon so that the addon can initialize itself into a proper state.

## How to create an addon?
The process of creating addon usually requires the next steps :
- The developer creates an addon page to be used by Outreach users,
- The developer creates a [manifest file](#manifest-file) describing the addon (including the URL of where the addon page is located)
- The manifest file gets [uploaded to the Outreach](#uploading-the-manifest), and the addon is visible only to a developer for dev/testing
- The developer [integrates the addon](#addon-integration)  with the Outreach client extensibility framework
- Once tested and approved, the developer makes the addon visible in the store to other Outreach users.

# Manifest file
Manifest is a simple JSON file that the addon developer uploads to Outreach and which contains all of the data needed for Outreach to host addon in an iframe.
 
Here is the sample manifest file of the hello world addon`"
{
    “version”: “0.10”
    "identifier": "addon-outreach-hello",
    “type”: “public”,
    "title":  [
        “en": “Hello world”,
        “fr”: “Salut tout le monde”

    ],
    "description": [
        “en”: “This is a sample addon created as a guide for Outreach addon creators ”,
        “en”: “Il s’agit d’un addon échantillon créé comme 
               un guide pour les créateurs addon Outreach”,
    ],
    "host": {
        type: 'tab-opportunity',
        url: "https://addon-host.com/hello-world,
        Icon: "https://addon-host.com/icon.png"
    },
    "context":  [ “user.id”, “opportunity.id”, “prospect.customField12” ],
    “scopes”: “prospects.read, opportunity.read” 
    “author”: {
        websiteUrl: “https://addon-host.com”,
        privacyUrl: “https://addon-host.com/privacy”,
        termsOfUseUrl: “https://addon-host.com/tos”,
    }
}
`"
## Basic manifest properties

### identifier
Unique identifier of the addon as defined by the addon creator

### type
Type of addon: 
- **Public**
  
  The addon is going to be available in the addon store to all of the Outreach users.

- **Private** 
  
 The addon is going to be available only internally for users of a company that created the addon.

- **Personal** 
  
  The addon is going to be available only to a developer who uploaded the manifest.

### title
The localized addon title is shown in the addon store and Outreach app as a tab tile.

### description
A localized addon description is shown in the addon store to explain what addon does and why someone would want to install it.

### host
#### type
Outreach application supports different types of addons which can be loaded in different parts of the application.
Type property defines what the type of addon is and where it should be loaded.

_e.g **type: "tab-opportunity"** will result with addon being loaded as an additional tab on the Outreach opportunity page_ 

Supported addon types (we will expand this list as the time goes):
- tab-account
- tab-opportunity 
- tab-prospect

#### url
A URL address where the web page created by addon creator is hosted.

#### icon
base64 string represents the icon to be shown in the addon store and (if possible) in Outreach client.

### author

This section contains information to be presented to a user of the addon in the marketplace and on the consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.

## Integration manifest properties

### context
In this section, the addon author defines a list of predefined context information that addon needs from Outreach to be sent during the 
initialization process.
It is a string array of predefined Outreach properties describing attributes of the Outreach user loading the addon.

_e.g. ["opportunity.id", "account.id"]_

Outreach User will be asked to consent with sharing this information with the addon on the addon's first use.  If the future version of the manifest addon creator will add additional contextual fields, the Outreach user will consent again.

Here is the list of currently supported context information (we will add more):
- **account**: id, name, customId, custom1...custom100
- **user**: id, name, custom1 ... custom5
- **opportunity**: id, custom1...custom100,

### scopes 
_(If the addon creator needs no API access, this section can be omitted.)_

In the scopes section, the addon creator defines a list of Outreach API scopes which are needed for performing API calls addon needs to perform.

The list of scopes will be used for [Outreach API authentication](https://api.outreach.io/api/v2/docs#authentication "Outreach API authentication") where current Outreach user will be asked to consent for granting permissions for defined scopes to addon creator.

This list of scopes defined in the manifest will be reviewed during the addon approval process needed for an addon to be accepted in the addon store.

_ "Authorization scopes let you specify what type and level of access your application requires. Your OAuth application's scopes describe the possible set of values that may be requested. Still, the specific scopes requested during the authentication process are what will be applied to the resulting access token and used to restrict and permit application access.
Scopes are period-separated strings containing two parts: the first part is a pluralized resource name (e.g., prospects); the second part is a token — read, write, delete, or all — that describes the level of access permitted. For example, the scopes prospects.read and prospects.all would both grant access to read prospects, while only the latter would permit write and delete access. Scopes are not additive; the prospects.write scope does not grant read access."_

## Uploading the manifest
Once the manifest file is created, it has to be uploaded to Outreach so it can be tested and optimized in the Outreach app.

At the moment, there are two ways you can upload the manifest:
emailing it support email cxt-sdk@outreach.io
using the Outreach API to POST manifest file

_In the near future, we will have a section in the Outreach application where you would be able to upload it using the application UI._

# Addon integration
In order for a web page of addon creator to be able to integrate with Outreach client, that page has to support certain features enabling the integration of the Outreach host and addon.

There are two ways of implementing that integration:
- Simple integration
- Full integration

# Simple integration

A simple integration model is the recommended way of creating addons if addon matches two conditions:
1. Adon needs only initialization context and, once loaded, works independently from the host and doesn't need any more updates
2. Addon doesn't need to access Outreach API in the context of current Outreach user

So how it works?

When the Outreach host decides that an addon needs to be loaded, it will fetch it from the URL, which is a combination of:
- host.URL value defined in the manifest (e.g., https://addon-host.com/outreach)
- query parameters representing context values of context properties also defined in the manifest (e.g. "opportunity.id")
- query params which are always sent regardless of the manifest (e.g., locale='en' or theme=' light' etc.) 

That's how the resulting URL which Outreach will set as a source of iframe will be something like this:

```
    https://addon-host.com/outreach?locale=en&theme=light&opportnity.id=123456
```

Now all the addon creator has to do is to parse out of request query parameter values and to use them to initialize addon in a proper state and return to respond with the addon page initialized in the context of the sent data.

In case addon decides that the addon should not be loaded for given context information (e.g., there is no data on the addon side for an opportunity with given id), the addon should respond with a 404 status code. 

# Full integration

We expect that in a lot of cases, addons will need either access to Outreach API or a way to communicate with the host after initial loading, and for this type of addons, we are recommending full integration approach.

Everything described in simple integration is valid in this model too. Addon will get the same contextual information passed through the request query parameters and will be able to initialize itself on the initial load. In the case of full integration, this step is optional, as the same context will be sent to the client through the [addon initialization process](#addon-initialization).

Now let's look at the two additional scenarios which simple integration doesn't support:
- [Host communication](#host-communication)
- [API access](#api-access)

## Host communication
The outreach host is using iframes to load addons due to security and performance reasons. Once an addon is loaded, the Outreach host communicates with it using POST messages. 

Outreach client extensibility SDK is created as a thin wrapper around this communication, so the addon creator doesn't need to think about how this is implemented, but in case you would prefer your own integration library, that is totally ok too.

The code from this repository is packaged into an NPM package, which can be found here. 
```
    https://www.npmjs.com/package/@outreach/client-addon-sdk
```

In case you don't want to use the NPM package, we are also publishing it as a javascript bundle on Outreach CDN so you can just reference it on your Html page using a standard script tag.


### Addon initialization
In order for the addon to get into initialized state, there are a few simple steps to be performed on the addon host page :
- Subscribe to an [initialization event](#init-event-handler)
- Subscribe to [info event](#info-event-handler-optional)(optional)
- Invoke a [READY function](#ready-function). 

#### Init event handler
The Outreach host sends to addon contextual information of the current Outreach user loading the addon, which triggers on addon side init event handler. In case the initialization context changes after the addon are loaded, another Init message will be sent to the addon so it can reinitialize itself with the new context. 

The manifest Context section determines the payload of the initialization context (e.g., if there is Opportunity scope defined, the initialization context will contain current opportunity information).

```
    addonSdk.onInit = (ctx: Context) => {
        // addon initialization takes this values to initialize itself
    }
```

This event handler is invoked once on initial addon loading and every time after that when the initialization context of Outreach context changes.

#### Info event handler (optional)
To support the case when the addon developer is interested in getting information on internal SDK events, we have added an optional onInfo handler, which by default, will be invoked every time when there is an error in SDK.

 ```
    addonSdk.onInfo = (info: AddonInfo) => {
        // addon process the message 
    }
```
In case there is a need for observing other types of events, addonSdk defines a logLevel property which can be set to one of the enum values
None| Debug  | Info | Warn | Error.

```
    addonSdk.logLevel = LogLevel.Debug;
```
#### Ready function 
Once all the handlers are defined, and as soon as possible, addon sends a message to the host that it is ready for initialization by directly calling the ready method.

```
    addonSdk.ready();
```
This will result in an iframe post message being sent to the host informing the Outreach app that the addon is ready to receive initialization context describing the current Outreach user loading the addon.

### Additional addon functions

Addon sdk has a few additional functions allowing to addon to request a certain action to be performed by a host. Using these functions is optional, and it is ok if the addon creator decides not to use them.

#### Notify function 
In case when an addon wants to inform the Outreach user about some information, warning, or Error, it will need to invoke the Notify function requesting from an Outreach app to notify the user about that. 

```
    addonSdk.notify({type: ‘info’, text:’Saved!’);
```

The Outreach host will notify the user in a way consistent with the Outreach application UX.

#### Decorate function 

In case when an addon would like to update its decoration of the addon entry point (e.g., Tab title), it will need to invoke the Decorate function requesting from an Outreach app to update its entry point decoration.

```
    addonSdk.decorate({text:’Messages (2)’);
```

## API access

In some cases, the addon will need to make a call to Outreach API in the name of the current Outreach user using the addon.

### How it works?

All [Outreach API](https://api.outreach.io/api/v2/docs#authentication) requests must be authenticated with a token in the request’s HTTP Authorization header. 
To enable obtaining of that token, Outreach API supports OAuth flow where the Outreach user needs to consent for giving API access rights with the scopes defined in the addon manifest. Once a user consent to that, a short-lived authorization token will be sent to the addon host, which then uses it with its app secret and the key to obtaining the user access token, which then can be used to access Outreach API in the context of a user who granted those rights.

### What addon needs to do to support this?
In order for the addon to perform an API call, there are a few things to be done for that:
setup Outreach OAuth application 
update addon host to support auth scenario
invoke authenticate() function

### Onboard to Outreach API
You will need to create a dedicated Outreach OAuth application for your addon, and to achieve that, please contact platform@outreach.io for assistance.
With that addon  OAuth application created, you will have:
application identifier
application secret
redirect URI 

The redirect URI has to be the same as the addon host URL defined in the manifest.

### Addon host auth requirements

#### Obtaining the access token
Once a user consents to grant addon access rights to Outreach API in his name, the flow will redirect to the URL defined in OAuth application redirect_URI with an additional query parameter "code".

Addon host then [uses that auth token from the code param](https://api.outreach.io/api/v2/docs#authentication) combined with application id and the application secret.

Request
```
curl https://api.outreach.io/oauth/token
  -X POST
  -d client_id=<Application_Identifier>
  -d client_secret=<Application_Secret>
  -d redirect_uri=<Application_Redirect_URI>
  -d grant_type=authorization_code
  -d code=<Authorization_Code>
  ```

Response will contain all the data needed for accesingthe token.
```
{
  "access_token": <Access_Token>,
  "token_type": "bearer",
  "expires_in": 7200,
  "refresh_token": <Refresh_Token>,
  "scope": <Scope1+Scope2+Scope3>,
  "created_at": 1503301100
}
```

#### Caching the refresh token
Now when addon host has obtain this data it needs to store somewhere refresh token of this user so later when user will load again addon it could generate a new access token without forcing user to go trough authentication consenting.



```
	addonSdk.authenticate()
		.then( (e: AuthInfo) => {
			  // e.success, e.token, e.expiresAt
		} )
```
### Initial authentication flow
First time when the addon invokes the authenticate() function, 





