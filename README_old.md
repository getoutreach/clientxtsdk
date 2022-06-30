
<!-- omit in toc -->
# Outreach client extensibility SDK

This document contains all the information a developer needs to create an Outreach addon.

If you have any questions/comments/concerns about the client's extensibility, please email us at **cxt-sdk@outreach.io.**

_NOTE: This document is an early preview of the client extensibility framework whose primary purpose is to speed up the collaboration and scenario exploration with potential addon creators. It will be changing at a rapid pace until the official release of the platform._

Table of content

- [How it works](#how-it-works)
- [Required steps to build an addon](#required-steps-to-build-an-addon)
- [What can you make?](#what-can-you-make)
  - [Application addon](#application-addon)
  - [Tab addon](#tab-addon)

## How it works

When an Outreach user goes to a specific part of the Outreach application (e.g., opportunity page), the application will check if that user has installed addons for that part of the app and if yes:

- Add a tab with the title of the addon
- Add an iframe with the source pointing to an addon hosting page
- Send the current user contextual information to the addon to initialize itself into a proper state.

## Required steps to build an addon

The client extensibility framework supports a few integration methods with different coding requirements and provides a different integration level with Outreach. Each one of the methods requires one or more steps to be implemented based on the addon requirements.

1. Every addon needs to have an addon web page, which will Outreach users see loaded as a source of addon iframe. This page implementation has to follow [a very small set of requirements](/docs/host-requirements.md).

    _During the development phase, addon creators can skip this requirement and use only a [Locally hosted addon page](/docs/devxp.md) without the need to have a publicly available page._

2. Every addon also needs to **create and upload a manifest file**.
That manifest file contains things like the URL where the addon web page is located, contextual information which addon needs from Outreach, details about Outreach API access, etc.

    If your addon is **stateless** (e.g., currency exchange calculator addon)  or your addon has **independent initialization** (e.g., initialize itself based on its cookie), there is no need for any additional work to be done.

    Go to [manifest file](/docs/manifest.md) page to learn more.

3. All stateful addons would need contextual information from Outreach to initialize themselves in the proper state. For that, they need to **parse from the URL** a set of contextual information (e.g., opportunity id, prospect email, etc.) sent by Outreach.

    Go to [host url parameters parsing](/docs/url-parsing.md) page to learn more.

4. Most of the addons would want to have **deeper integration with the Outreach application** (e.g., to notify Outreach user about some addon event), and for that, the addon will need to integrate the Outreach client sdk.
  
    Go to [Outreach client SDK](/docs/sdk.md) page to learn more.

5. Some of the addons will need to have **client access to Outreach API**, and for that, they will need to add support on the addon server required for obtaining and refreshing access tokens. This will include implementing additional endpoints, server to server calls to Outreach API, token caching, etc.

    Go to [Outreach API access](/docs/outreach-api.md) page to learn more about API access requirements.

*If you have any questions/comments/concerns about the extensibility, please check the [FAQ](/docs/faq.md) or email us at **cxt-sdk@outreach.io.***

## What can you make?

There are two types of addons you can create with the Outreach client sdk: application addon and tab addon.

### Application addon

Application addon is a type of addon where the addon creator wants to bring its all app to Outreach.

![alt text](docs/assets/left-side-menu-addon-example.png "Left side menu addon example")
This type of app has an icon in the left side menu at the same level as other Outreach icons. Clicking on that icon will load an iframe taking the whole space and showing the addon host page defined in the manifest.

Application addon can receive only user and organisation [contextual information](context.md).

Application addon can define a special [notifications endpoint](manifest.md#notificationsurl), which will enable it to implement things as unread notifications badge decoration, show informational toast, etc., even before Outreach user interacted with the addon.

### Tab addon

Tab addon is an addon that enables you to load your application in a context of a specific account, prospect, or opportunity. Your application is being loaded as an additional tab beside other standard Outreach tabs.

![alt text](docs/assets/tab-addon-example.png "Tab addon example")

Tab addons are loaded after the tab is being opened. 
In addition to the organization and user context available to application addons, they can receive current account context (account tab), current prospect context (prospect tab), and current opportunity context (opportunity tab).

Tab addons do not support the notification feature application addons have.
