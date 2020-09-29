<!-- omit in toc -->
# Outreach client extensibility SDK

This document contains all the information a developer needs to create an Outreach addon.

*In case you have any questions/comments/concerns about the extensibility, please email us at cxt-sdk@outreach.io.***

Table of content

- [How it works](#how-it-works)
- [How does the development process look](#how-does-the-development-process-look)
- [How much coding is needed](#how-much-coding-is-needed)
- [How to learn more about building an addon](#how-to-learn-more-about-building-an-addon)

## How it works

When Outreach user goes to a specific part of the Outreach application (e.g., opportunity page), the application will check if that user has installed addons for that part of the app and:

- Add a tab with the title of the addon
- Add an iframe with the source pointing to an addon hosting page
- Send the current user contextual information to the addon to initialize itself into a proper state.

## How does the development process look

The process of creating addon usually requires the next steps:

- The developer creates an addon page to be used by Outreach users,
- The developer creates a [manifest file](/docs/manifest.md)  describing the addon (including the addon page URL)
- The manifest file gets [uploaded to the Outreach](/docs/manifest.md#uploading-the-manifest), and the addon is visible only to a developer for dev/testing
- The developer [integrates the addon](/docs/host.md) with the Outreach client extensibility framework
- Once the addon is implemented, the developer makes the addon visible in the store to other Outreach users.

## How much coding is needed

The client extensibility framework supports a few integration methods, which have different coding requirements and provide a different integration level with Outreach.

Every addon needs to have, at a minimum, a publicly accessible web page that implements addon functionality for Outreach users. For Outreach to be aware of the addon hosting page, the addon creator needs to  [create a JSON manifest](/docs/manifest.md).

If your addon is **stateless** (e.g., currency exchange calculator addon)  or your addon has **independent initialization** (e.g., initialize itself based on its cookie), there is no need for any additional work to be done.

Suppose your addon needs to **be aware of the current Outreach user's context** during its initial loading. In that case, it can do that by merely parsing the query parameter values containing context information.

In case your addon needs to communicate with the Outreach app, it needs to integrate the [Outreach SDK](/docs/sdk.md).
An example of this integration would be an addon that wants to inform the user about an error in addon by requesting the Outreach app to show error notification.

In case your addon needs **access to Outreach API**,  it will require, in addition to [Outreach SDK](/docs/sdk.md) integration also an update of [the addon host](/docs/host.md) to support the Outreach API authentication.
While this is the only non-trivial amount of coding, it should be doable in a few hours based on this document's instructions.

## How to learn more about building an addon

In any type of integration, you would need to create and uplad a manifest file, so you can start by learning more about [manifest file](/docs/manifest.md) page.

In case your integration will need to integrate SDK, you can learn about it on [Outreach SDK](/docs/sdk.md) page.

In case your integration will require client access to Outreach API, you will have to learn more about [Addon host](/docs/host.md) requirements.

*In case you have any questions/comments/concerns about the extensibility, please email us at **cxt-sdk@outreach.io.***
