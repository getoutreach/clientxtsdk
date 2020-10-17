<!-- omit in toc -->
# Outreach API scopes

If an addon needs access to Outreach API  it needs to define one or more of [API scopes](https://api.outreach.io/api/v2/docs#authorization) it needs. The Outreach user will then need to consent with the granting impersonalized API access with requested scopes.

From [Outreach API](https://api.outreach.io/api/v2/docs#authorization) documentation

> Authorization scopes let you specify exactly what type and level of access your application requires. Your OAuth application’s scopes describe the possible set of values that may be requested, but the specific scopes requested during the authentication process are what will be applied to the resulting access token and used to restrict and permit application access.
>
> Scopes are strings containing two parts: the first part is a pluralized resource name (e.g. prospects); the second part is a token — read, write, delete or all — that describes the level of access permitted. For example, the scopes prospects.read and prospects.all would both grant access to read prospects, while only the latter would permit write and delete access. Scopes are not additive; the prospects.write scope does not grant read access.

All of the [SDK scopes](../src/store/scopes.ts) are resource grouped in:

- **audits** (audits all|read)
- **accounts** (accounts all|read|write|delete)
- **call dispositions** (callDispositions all|read|write|delete)
- **call purposes** (callPurposes all|read|write|delete)
- **calls** (calls all|read|write|delete)
- **custom duties** (customDuties all|read|write|delete)
- **content categories** (contentCategories all|read|write|delete)
- **content category memberships** (contentCategoryMemberships all|read|write|delete)
- **duties** (duties all|read|write|delete)
- **email addresses** (emailAddresses all|read|write|delete)
- **events** (events all|read|write|delete)
- **favorites** (favorites all|read|write|delete)
- **mail aliases** (mailAliases all|read|write|delete)
- **mailboxes** (mailboxes all|read|write|delete)
- **mailings** (mailings read|write|delete)
- **opportunities** (opportunities all|read|write|delete)
- **opportunity prospect roles** (opportunityProspectRoles all|read|write|delete)
- **opportunity stages** (opportunityStages all|read|write|delete)
- **personas** (personas all|read|write|delete)
- **phone numbers** (phoneNumbers all|read|write|delete)
- **profiles** (profiles all|read|write|delete)
- **prospects** (prospects all|read|write|delete)
- **roles** (roles all|read|write|delete)
- **rulesets** (rulesets all|read|write|delete)
- **sequence states** (sequenceStates all|read|write|delete)
- **sequence steps** (sequenceSteps all|read|write|delete)
- **sequence templates** (sequenceTemplates all|read|write|delete)
- **sequences** (sequences all|read|write|delete)
- **snippets** (snippets all|read|write|delete)
- **stages** (stages all|read|write|delete)
- **task priorities** (taskPriorities all|read|write|delete)
- **tasks** (tasks all|read|write|delete)
- **teams** (teams all|read|write|delete)
- **templates** (templates all|read|write|delete)
- **users** (users all|read|write|delete)
- **web hooks** (webhooks all|read|write|delete)
