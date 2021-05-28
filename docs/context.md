<!-- omit in toc -->

# Outreach context properties

Table of content:

- [Outreach context properties](#outreach-context-properties)
  - [Account contextual information](#account-contextual-information)
  - [Opportunity contextual information](#opportunity-contextual-information)
  - [Prospect contextual information](#prospect-contextual-information)
  - [User contextual information](#user-contextual-information)
- [External contextual information](#external-contextual-information)
  - [External information payload](#external-information-payload)
  - [Accessing external information from SDK](#accessing-external-information-from-sdk)
  - [External information from URL](#external-information-from-url)

Every addon can request one or more contextual values describing the current Outreach user.

The properties are grouped into four groups: account, opportunity, prospect, and user.

\*In case you would like to have additional contextual properties, please contact us on **cxt-sdk@outreach.io.***

## Account contextual information

If an addon needs contextual information about the current account Outreach user is looking at, it will need to add to manifest one or more account properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#account), but at the moment we support in [SDK](../src/store/keys/AccountContextKeys.ts) next properties:

- **acc.cstmId** A custom ID for the account, often referencing an ID in an external system.
- **acc.desc** A custom description of the account.
- **acc.id** Account id
- **acc.loc** The company’s primary geographic region (e.g. "Eastern USA").
- **acc.name** The name of the company (e.g. "Acme Corporation").
- **acc.tags** A list of tag values associated with the account (e.g. ["Enterprise", "Tier 1"]).
- **acc.csf1** to **acc.csf100** the value of the (1-100) account's custom field.

## Opportunity contextual information

If an addon needs contextual information about the current opportunity the Outreach user is looking at, it will need to add to manifest one or more opportunity properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#opportunity), but at the moment, we support in [SDK](../src/store/keys/OpportunityContextKeys.ts) next properties:

- **opp.amnt** The amount the opportunity is worth.
- **opp.desc** A description of the opportunity.
- **opp.ecrat** The date the opportunity was created in the external system.
- **opp.id** Opportunity id
- **opp.name** The name of the opportunity.
- **opp.nstp** The next step to take for the opportunity.
- **opp.prob** The chances of the opportunity succeeding represented as a percentage.
- **opp.tags** Tags associated with the opportunity.
- **opp.type** The type of opportunity.
- **opp.csf1** to **opp.csf100** the value of the (1-100) opportunity's custom field.

## Prospect contextual information

If an addon needs contextual information about the current prospect Outreach user is looking at, it will need to add to manifest one or more prospect properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#prospect), but at the moment, we support in [SDK](../src/store/keys/ProspectContextKeys.ts) next properties:

- **pro.avail** The date and time the prospect is available to contact again.
- **pro.comp** The name of the prospect company. If associated with an account, this is the name of the account. (e.g. Acme International).
- **pro.emails** A list of email addresses associated with the prospect.
- **pro.loc** The locality of the prospect's company.
- **pro.id** Prospect id
- **pro.tags** A list of tag values associated with the account (e.g. ["Interested", "2017 Expo"]).
- **pro.tzone** The prospect's current timezone, preferably in the IANA format (e.g., "America/LosAngeles").
- **pro.title** The title of the prospect.
- **pro.csf1** to **pro.csf120** the value of the (1-120) prospect's custom field.

## User contextual information

If an addon needs contextual information about the current Outreach user, it will need to add to manifest one or more user properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#user), but at the moment, we support in [SDK](../src/store/keys/UserContextKeys.ts) next properties:

- **usr.email** The email address of the user.
- **usr.fname** The first name of the user.
- **usr.id** user id.
- **ust.lname** The last name of the user.
- **usr.tit** The user's job title (e.g., "Staff Accountant").
- **usr.uname** A reader-friendly unique identifier of the user.
- **usr.csf1** to **usr.csf5** the value of the (1-5) user's custom field.

# External contextual information

Every Outreach user can have one or more plugins installed and connect Outreach with Salesforce, Dynamics, and other providers of prospect, account, and opportunity data.

Once a plugin is installed (Settings/Plugins) and synchronizing data with the external data source prospect page will show a new section with external prospect information.

![alt text](assets/prospect_plugin.png 'Salesforce prospect plugin')

We have created SDK support for a set of dedicated manifest keys to enable addon creators to receive this external prospect information and use it to link data in their own dataset with the outreach account through the same shared external ID used in both systems.

There are three context keys available for addon creators to access current Outreach user info:

- **acc.ext** retrieving external account info
- **pro.ext** retrieving external prospect info
- **acc.ext** retrieving external opportunity info

Each one of these properties has the same payload format and the same ways of reading it.

## External information payload

The value of this property is a complex object array, where each one of the array items represents information of one of the plugins. For example, if Outreach user has installed plugins for Salesforce and Dynamics, the array will have two objects with prospect information in each one of these external systems.

This external information object has a few external contextual properties (all of them shown in Outreach prospect page as shown above):

- **enabled** is plugin integration enabled?
- **id** external prospect id (e.g. 00Q090000030WR6EAM)
- **name** external prospect name
- **type** external prospect type (e.g. LEAD)
- **provider** 1 - Salesforce, 2 - Salesforce (sandbox), 3 - Dynamics
- **lastInbound** Last date when the prospect data are synced to Outreach from external system
- **lastOutbound** Last date when the prospect data are synced to the external system from Outreach

As with all the other contextual properties, you can access these values: either through your own parsing of the addon hosting URL or using the SDK to do that for you automatically.

## Accessing external information from SDK

This information is a standard part of the [initialization Outreach context](https://github.com/getoutreach/clientxtsdk/blob/main/docs/sdk.md#outreach-context) external info property

simply read the value of **ctx.prospect.externalInfo** : [ExternalInfoContext](https://github.com/getoutreach/clientxtsdk/blob/main/src/context/ExternalInfoContext.ts) and it will contain an array of the all the external information prospect has.

## External information from URL

To reduce the length of the URL, external information is packed to the shorter format by using the **pack()** function of [ExternalInfoUtils](https://github.com/getoutreach/clientxtsdk/blob/main/src/context/ExternalInfoUtils.ts).

The value is JSON serialized form of the contextual array with all the property names being abbreviated. To read the values addon creator has to use either **unpack()** function from the ExternalInfoUtils or manually deserialize the array and read the values using abbreviated property names.

- **enabled** -> e
- **id** -> i
- **name** -> n
- **type** -> t
- **provider** -> p
- **lastInbound** -> li
- **lastOutbound** -> lo
