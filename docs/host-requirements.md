# Query parameters parsing

Any time when the Outreach app loads an addon, it will set as iframe source an URL created out of:

- host.URL value [defined in the manifest](manifest.md#url)
- query parameters representing [context values of current Outreach user](manifest.md#context) also defined in the manifest (e.g. "opp.id")
- [config parameters](configuration.md) (if any) which have [urlInclude](configuration.md##urlinclude) property enabled.
- query params which are always sent regardless of the manifest:
  - locale='en',
  - theme='light'
  - uid={usr.id}

That's how the resulting URL which Outreach will set as a source of iframe will be something like this:

```http
    https://addon-host.com/something?locale=en&uid=a1234&opp.id=123456
```

When the addon loading request comes, the addon has to parse out of request query parameter values and, based on them to return some of the next responses: 200, 302, and 404.

## 200 (OK)

When received parameters are sufficient for the addon to initialize itself into a state matching the given Outreach context, the addon should return the initialized page as **200 (OK)** response containing the addon page content will be shown in the iframe.

## 302 (FOUND)

When the host URL [defined in the manifest](manifest.md#url) needs to be transformed to some other URL, the addon hosting page should implement the logic that will determine a new URL based on the received context. That new URL is then being returned as a response with **302 (FOUND)** status code to the iframe, which will update itself and show the content of that new URL automatically.

A typical use case is that manifest contains URL without any parameters and upon the first request based on received Outreach context is transformed to a different URL which addon host needs. That URL will be returned as a Location header in the response with the 302 (FOUND) status code.

## 404 (NOT FOUND)

In case the addon determines that, with a received set of parameters, there is nothing to be shown in the Outreach app, it will just return **404 (NOT FOUND)** response, and the Outreach app will hide the addon in that case. 
An alternative to this "do not show addon" approach, we recommend, is to create a landing page that will offer the creation of the new addon resources so the user will be onboarded with that.