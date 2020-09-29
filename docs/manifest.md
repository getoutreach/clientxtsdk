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