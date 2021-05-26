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

When the add-on loading request comes, the add-on has to parse out of request query parameter values and based on them to return some of the next responses as described in [url parsing section](url-parsing.md)