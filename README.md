
<!-- omit in toc -->
# Outreach client extensibility SDK

This document contains all the information a developer needs to create an Outreach add-on.

In case you have any questions/comments/concerns about the client extensibility, please email us at **cxt-sdk@outreach.io.**

_NOTE: This document is an early preview of the client extensibility framework whose primary purpose is to speed up the collaboration and scenario exploration with potential add-on creators. It will be changing at a rapid pace until the official release of the platform._

Table of content

- [How it works](#how-it-works)
- [Required steps to build an add-on](#required-steps-to-build-an-add-on)

## How it works

When an Outreach user goes to a specific part of the Outreach application (e.g., opportunity page), the application will check if that user has installed add-ons for that part of the app and if yes:

- Add a tab with the title of the add-on
- Add an iframe with the source pointing to an add-on hosting page
- Send the current user contextual information to the add-on to initialize itself into a proper state.

## Required steps to build an add-on

The client extensibility framework supports a few integration methods, which have different coding requirements and provide a different integration level with Outreach. Each one of the methods requires one or more steps to be implemented based on the add-on requirements.

1. Every add-on needs to have an add-on web page, which will Outreach users see loaded as a source of add-on iframe. This page implementation has to follow [a very small set of requirements](/docs/host-requirements.md).

    _During the development phase, add-on creators can skip this requirement and use only a [Locally hosted add-on page](/docs/devxp.md) without the need to have a publicly available page._

2. Every add-on also needs to **create and upload a manifest file**.
That manifest file contains things like the URL where the add-on web page is located, contextual information which add-on needs from Outreach, details about Outreach API access, etc.

    If your add-on is **stateless** (e.g., currency exchange calculator add-on)  or your add-on has **independent initialization** (e.g., initialize itself based on its cookie), there is no need for any additional work to be done.

    Go to [manifest file](/docs/manifest.md) page to learn more.

3. All of the stateful add-ons would need contextual information from Outreach to initialize itself in the proper state. For that, they need to **parse from the URL** a set of contextual information (e.g., opportunity id, prospect email, etc.) sent by Outreach.

    Go to [host url parameters parsing](/docs/url-parsing.md) page to learn more.

4. Most of the add-ons would want to have **deeper integration with Outreach application** (e.g., to notify Outreach user about some add-on event), and for that, the add-on will need to integrate Outreach client sdk.
  
    Go to [Outreach client SDK](/docs/sdk.md) page to learn more.

5. Some of the add-ons will need to have **client access to Outreach API**, and for that, they will need to add support on the add-on server required for obtaining and refreshing access tokens. This will include implementing additional endpoints, server to server calls to Outreach API, token caching, etc.

    Go to [Outreach API access](/docs/outreach-api.md) page to learn more about API access requirements.

*If you have any questions/comments/concerns about the extensibility, please check the [FAQ](/docs/faq.md) or email us at **cxt-sdk@outreach.io.***
