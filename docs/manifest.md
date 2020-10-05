<!-- omit in toc -->
# Manifest file

Manifest is a simple JSON file that the addon developer uploads to Outreach and which contains all of the data needed for Outreach to host addon in an iframe.

Table of content:

- [Sample manifest](#sample-manifest)
- [Basic manifest properties](#basic-manifest-properties)
  - [identifier](#identifier)
  - [store](#store)
  - [title](#title)
  - [description](#description)
  - [host](#host)
    - [type](#type)
    - [url](#url)
    - [icon](#icon)
  - [author](#author)
- [Integration manifest properties](#integration-manifest-properties)
  - [context](#context)
- [api (optional)](#api-optional)
  - [token endpoint](#token-endpoint)
  - [scopes](#scopes)
- [Uploading the manifest](#uploading-the-manifest)

## Sample manifest

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

#### type

Outreach application supports different types of addons which can be loaded in different parts of the application.
Type property defines what the type of addon is and where it should be loaded.

_e.g **type: "tab-opportunity"** will result with addon being loaded as an additional tab on the Outreach opportunity page_

[SDK supported addon types](https://github.com/getoutreach/clientxtsdk/blob/develop/src/store/AddonType.ts) (we will expand this list as the time goes):

- tab-account
- tab-opportunity
- tab-prospect

#### url

Address where the addon hosting web page is hosted.

This URL can be a direct URL without any value placeholders, in which case Outreach host will add all of the contextual parameters as query parameters.

e.g.

```javascript
manifest.host.url = "http://somesite.com/something"
manifest.context = ["opp.id", "usr.id"]
```

In the case of outreach user with id 456 looking at opportunity 123, this will result during the runtime.

```bash
 http://somesite.com/something?opp.id=123&usr.id=456
```

In addition to this default behavior, the addon creator can customize how the addon URL is constructed by applying simple templatization.

e.g.

```javascript
manifest.host.url = "http://somesite.com/something/{usr.id}"
```

will become during the runtime

```bash
http://somesite.com/something/456?opp.id=123
```

_NB: as opp.id was not tokenized it was appended as query parameter following the default naming convention_

The addon creator can templatize the name of the query parameters.

e.g.

```javascript
manifest.host.url = "http://somesite.com/something/{usr.id}?oid={opp.id}"
```

will become during the runtime

``` bash
http://somesite.com/something/456?oid=123
```

#### icon

base64 string represents the icon to be shown in the addon store and (if possible) in Outreach client.

### author

This section contains information to be presented to a user of the addon in the marketplace and on the consent screen: addon creator name, website URL, privacy policy document URL, and terms of use document URL.

## Integration manifest properties

### context

In this section, the addon author defines a list of predefined context information that addon needs from Outreach to be sent during the initialization process.
It is a string array of predefined Outreach properties describing attributes of the Outreach user loading the addon.

e.g. ["opportunity.id", "account.id"]

Complete list of all of the supported context properties can be found on [context property page](context.md).

Outreach User will be asked to consent with sharing this information with the addon on the addon's first use.  If the future version of the manifest addon creator will add additional contextual fields, the Outreach user will consent again.

[ADD-CONTEXT-CONSENT-SCREENSHOT-HERE]

## api (optional)

This section is optional - if addon doesn't need access to outreach API, this section can be omitted.

### token endpoint

Address of the endpoint, which will return support [refresh token flow](#refresh-token-flow). 

*In case addon doesn't need to access Outreach API, this section can be omitted.*

### scopes

In the scopes section, the addon creator defines a list of Outreach API scopes which are needed for performing API calls addon needs to perform.

Complete list of all of the API scopes can be found on [API Scopes page](scopes.md).

On the first [SDK authentication](sdk.md#authentication) Outreach user is then asked to consent with granting requested scopes to the addon
![alt text](api-consent.png "API consent screen")

## Uploading the manifest

Once the manifest file is created, it has to be uploaded to Outreach so it can be tested and optimized in the Outreach app.

At the moment, there are two ways you can upload the manifest:
emailing it support email cxt-sdk@outreach.io or by using the Outreach API to POST manifest file.

_In the near future, we will have a section in the Outreach application where you would be able to upload it using the application UI._