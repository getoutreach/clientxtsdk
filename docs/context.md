<!-- omit in toc -->
# Outreach context properties

Table of content:

- [Account contextual information](#account-contextual-information)
- [Opportunity contextual information](#opportunity-contextual-information)
- [Prospect contextual information](#prospect-contextual-information)
- [User contextual information](#user-contextual-information)

Every addon can request one or more contextual values describing the current Outreach user.

The properties are grouped in for groups: account, opportunity, prospect and user.

*In case you would like to have additional contextual properties, please contact us on **cxt-sdk@outreach.io.***

## Account contextual information

If an addon needs contextual information about the current account Outreach user is looking at, it will need to add to manifest one or more account properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#account), but at the moment we support in [SDK](https://github.com/getoutreach/clientxtsdk/blob/develop/src/store/keys/AccountContextKeys.ts) next properties:

- **acc.cstmId** A custom ID for the account, often referencing an ID in an external system.
- **acc.desc** A custom description of the account.
- **acc.hid** Hash of account id
- **acc.loc** The company’s primary geographic region (e.g. "Eastern USA").
- **acc.name** The name of the company (e.g. "Acme Corporation").
- **acc.tags** A list of tag values associated with the account (e.g. ["Enterprise", "Tier 1"]).
- **acc.csf1** to **acc.csf100** the value of the (1-100) account's custom field.

## Opportunity contextual information

If an addon needs contextual information about the current opportunity Outreach user is looking at, it will need to add to manifest one or more opportunity properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#opportunity), but at the moment we support in [SDK](https://github.com/getoutreach/clientxtsdk/blob/develop/src/store/keys/OpportunityContextKeys.ts) next properties:

- **opp.amnt** The amount the opportunity is worth.
- **opp.desc** A description of the opportunity.
- **opp.ecrat** The date the opportunity was created in the external system.
- **opp.hid** Hash of opportunity id
- **opp.name** The name of the opportunity.
- **opp.nstp** The next step to take for the opportunity.
- **opp.prob** The chances of the opportunity succeeding represented as a percentage.
- **opp.tags** Tags associated with the opportunity.
- **opp.type** The type of opportunity.
- **opp.csf1** to **opp.csf100** the value of the (1-100) opportunity's custom field.

## Prospect contextual information

If an addon needs contextual information about the current prospect Outreach user is looking at, it will need to add to manifest one or more prospect properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#prospect), but at the moment we support in [SDK](https://github.com/getoutreach/clientxtsdk/blob/develop/src/store/keys/ProspectContextKeys.ts) next properties:

- **pro.avail** The date and time the prospect is available to contact again.
- **pro.comp** The name of the prospect company. If associated with an account, this is the name of the account. (e.g. Acme International).
- **pro.loc** The locality of the prospect's company.
- **pro.hid** Hash of prospect id
- **pro.tags** A list of tag values associated with the account (e.g. ["Interested", "2017 Expo"]).
- **pro.tzone** The prospect's current timezone, preferably in the IANA format (e.g. "America/LosAngeles").
- **pro.title** The title of the prospect.
- **pro.csf1** to **pro.csf120** the value of the (1-120) prospect's custom field.

## User contextual information

If an addon needs contextual information about the current Outreach user, it will need to add to manifest one or more user properties.

Our end goal is to provide contextual access to any of the properties available through the [Outreach API](https://api.outreach.io/api/v2/docs#user), but at the moment we support in [SDK](https://github.com/getoutreach/clientxtsdk/blob/develop/src/store/keys/UserContextKeys.ts) next properties:

- **usr.email** The email address of the user.
- **usr.fname** The first name of the user.
- **usr.hid** Hash of user id.
- **ust.lname** The last name of the user.
- **usr.tit** The user's job title (e.g. "Staff Accountant").
- **usr.uname** A reader-friendly unique identifier of the user.
- **usr.csf1** to **usr.csf5** the value of the (1-5) user's custom field.
