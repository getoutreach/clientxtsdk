<!-- omit in toc -->
# Addon configuration

Some of the add-ons require a user-specific configuration to be initialized properly.

That configuration contains one or more user values either when the user installed the add-on or at the moment of first interaction (if the add-on was installed for the user by an admin).

Add-on creator needs to define in manifest what are the configuration values Outreach needs to collect for them, and Outreach will then construct a UI component that will gather and persist configuration data from the user. 
Outreach application will send to add-on all of those collected with every add-on initialization.

- [Manifest configuration definition](#manifest-configuration-definition)
  - [Example configuration section](#example-configuration-section)
  - [Configuration items](#configuration-items)
    - [key](#key)
    - [text](#text)
    - [type](#type)
    - [required](#required)
    - [validator](#validator)
    - [defaultValue](#defaultvalue)
    - [options](#options)
    - [urlInclude](#urlinclude)
  - [Configuration values](#configuration-values)
    - [URL support](#url-support)
    - [SDK support](#sdk-support)

## Manifest configuration definition

The manifest has to have a configuration section that will describe the Outreach app's values add-on needs to initialize.

The configuration section contains zero or more configuration items.

### Example configuration section

Let's look at an example of an add-on that requires Outreach users to visit the add-on creator web site and obtain their client id, key, and secret for accessing add-on creator APIs. Those values add-on expects Outreach to provide during the add-on initialization, so add-on can use them to access its APIs in the context of Outreach user.

The add-on creator will add a config section into the manifest with three configuration items to achieve this.

```json
manifest: {
  "configuration": [
    {
      "key": "clientId",
      "text": {
        "en": "Enter client id"
      },
      "type": "string",
      "required": true,
      "urlInclude": true
    },
    {
      "key": "clientKey",
      "text": {
        "en": "Enter client secret"
      },
      "type": "string",
      "required": true,
      "urlInclude": false
    },
    {
      "key": "clientSecret",
      "text": {
        "en": "Enter client key"
      },
      "type": "string",
      "required": true,
      "urlInclude": false
    }
  ]
}

```

### Configuration items

Every configuration item has a list of properties describing the type of configuration data being collected, which is then used by the Outreach app to render relevant UI components collecting that data.

#### key

Keycode of the configuration value. It is sent as a part of the add-on initialization context, and through the URL, so it is recommended to be short.

#### text

Localized text of the label text is shown to a user explaining the configuration value the user needs to provide.

#### type

Type of the configuration value data defining the type of UI component used to collect this configuration value.
string - regular input control

- number - input type="number"
- date - input type="date"
- uri - input type="url"
- options - multi-select control producing an array of option values
- select - single select control selecting one of the possible configs

#### required

Define if the config value is mandatory and has to be provided by the user.

#### validator

Represents an optional regex expression that will be used to validate the configuration value entered by the user.

#### defaultValue

Represents an optional default value to be offered to the user by default when the configuration component loads

#### options

An optional collection of values is presented to the user if the type is 'options' or 'select' from which the user selects one or more options.

#### urlInclude

Represents a value defining if the Outreach app will pass the configuration value through the URL in addition to the initialization message.

### Configuration values

Configuration value is a combination of key and value where the key is [configuationItem.key](#key), and value is value Outreach user-entered before the add-on loads.

Those values are passes to addon through url and add-on sdk initialization event.

#### URL support

As you can see in the example above, the clientId value is an example of the value passed through UI as an add-on will need it very early.
The url used for loading will have an additional parameter for clientId

```http
http://some-site.com/addon?...&clientId=a12345
```

#### SDK support

All of the configuration values are sent to addon through the addon [initilization message config property](https://github.com/getoutreach/clientxtsdk/blob/master/docs/sdk.md#addon-initialization).
