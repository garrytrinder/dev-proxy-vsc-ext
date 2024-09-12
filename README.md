# Dev Proxy Toolkit

[Dev Proxy](https://aka.ms/devproxy) is an API simulator that helps you effortlessly test your app beyond the happy path.

The Dev Proxy Toolkit extension for Visual Studio Code makes it easy to create and update configuration files.

> **IMPORTANT**
>
> Dev Proxy Toolkit is designed to be used with the latest version of Dev Proxy, 0.20.1. If you are using an earlier build some features may not work as intended.
>

## Features

The following sections describe the features that the extension contributes to Visual Studio Code when installed.

### Code Actions

- Update schema to match installed version of Dev Proxy

### Code Lenses

- Plugin documentation link

### Commands

- `Dev Proxy: Start` - Only available when Dev Proxy is not running
- `Dev Proxy: Stop` - Only available when Dev Proxy is running
- `Dev Proxy: Raise mock request` - Only available when Dev Proxy is running
- `Dev Proxy: Start recording` - Only available when Dev Proxy is running
- `Dev Proxy: Stop recording`- Only available when Dev Proxy is recording

### Diagnostics

- Check for missing `configSection` property in plugin instance for plugins that require configuration
- Check for missing `configSection` when defined in plugin instance
- Check that schema matches installed version of Dev Proxy
- Check that reporters are placed after plugins

### Editor Actions

Shown when the active document is a Dev Proxy configuration file

- Start Dev Proxy
- Stop Dev Proxy
- Raise mock request
- Start recording
- Stop recording

### Notifications

- Not installed
- New version detection

### Settings

- `dev-proxy-toolkit.version` - Determines the version to use when Dev Proxy and Dev Proxy Beta are installed side by side. Can be `stable` (default) or `beta`.
- `dev-proxy-toolkit.newTerminal` - Determines if Dev Proxy should be started in a new terminal. Can be `true` (default) or `false`.
- `dev-proxy-toolkit.showTerminal` - Determines if the terminal should be shown when Dev Proxy is started. Can be `true` (default) or `false`.
- `dev-proxy-toolkit.closeTerminal` - Determines if the terminal should be closed when Dev Proxy is stopped. Can be `true` (default) or `false`.
- `dev-proxy-toolkit.apiPort` - Determines the port to use to communicate with Dev Proxy API. Default is `8897`.

### Snippets

| Prefix | Description |
| ------ | ----------- |
| `devproxy-config-file` | Dev Proxy config file |
| `devproxy-config-file-schema` | Dev Proxy config file schema |
| `devproxy-mocks-file` | Dev Proxy mocks file |
| `devproxy-mocks-file-schema` | Dev Proxy mocks file schema |
| `devproxy-mock` | Dev Proxy mock |
| `devproxy-request` | Dev Proxy request |
| `devproxy-response` | Dev Proxy response |
| `devproxy-response-header` | Dev Proxy response header |
| `devproxy-plugin-api-center-minimal-permissions` | ApiCenterMinimalPermissionsPlugin instance |
| `devproxy-plugin-api-center-minimal-permissions-config` | ApiCenterMinimalPermissionsPlugin config section |
| `devproxy-plugin-api-center-onboarding` | ApiCenterOnboardingPlugin instance |
| `devproxy-plugin-api-center-onboarding-config` | ApiCenterOnboardingPlugin config section |
| `devproxy-plugin-api-center-production-version` | ApiCenterProductionVersionPlugin instance |
| `devproxy-plugin-api-center-production-version-config` | ApiCenterProductionVersionPlugin config section |
| `devproxy-plugin-caching-guidance` | CachingGuidancePlugin instance |
| `devproxy-plugin-caching-guidance-config` | CachingGuidancePlugin config section |
| `devproxy-plugin-crud-api` | CrudApiPlugin instance |
| `devproxy-plugin-crud-api-config` | CrudApiPlugin config section |
| `devproxy-plugin-crud-api-file` | CrudApiPlugin API file |
| `devproxy-plugin-crud-api-file-schema` | CrudApiPlugin API file schema |
| `devproxy-plugin-crud-api-action` | CrudApiPlugin action |
| `devproxy-plugin-dev-tools` | DevToolsPlugin instance |
| `devproxy-plugin-dev-tools-config` | DevToolsPlugin config section |
| `devproxy-plugin-entra-mock-response` | EntraMockResponsePlugin instance |
| `devproxy-plugin-entra-mock-response-config` | EntraMockResponsePlugin config section |
| `devproxy-plugin-execution-summary` | ExecutionSummaryPlugin instance |
| `devproxy-plugin-execution-summary-config` | ExecutionSummaryPlugin config section |
| `devproxy-plugin-generic-random-error` | GenericRandomErrorPlugin instance |
| `devproxy-plugin-generic-random-error-config` | GenericRandomErrorPlugin config section |
| `devproxy-plugin-generic-random-error-file` | GenericRandomErrorPlugin errors file |
| `devproxy-plugin-generic-random-error-file-schema` | GenericRandomErrorPlugin errors file schema |
| `devproxy-plugin-graph-beta-support-guidance` | GraphBetaSupportGuidancePlugin instance |
| `devproxy-plugin-graph-client-request-id-guidance` | GraphClientRequestIdGuidancePlugin instance |
| `devproxy-plugin-graph-mock-response` | GraphMockResponsePlugin instance |
| `devproxy-plugin-graph-mock-response-config` | GraphMockResponsePlugin config section |
| `devproxy-plugin-graph-random-error` | GraphRandomErrorPlugin instance |
| `devproxy-plugin-graph-random-error-config` | GraphRandomErrorPlugin config section |
| `devproxy-plugin-graph-sdk-guidance` | GraphSdkGuidancePlugin instance |
| `devproxy-plugin-graph-select-guidance` | GraphSdkGuidancePlugin instance |
| `devproxy-plugin-http-file-generator` | HttpFileGeneratorPlugin instance |
| `devproxy-plugin-http-file-generator-config` | HttpFileGeneratorPlugin config section |
| `devproxy-plugin-latency` | LatencyPlugin instance |
| `devproxy-plugin-latency-config` | LatencyPlugin config section |
| `devproxy-plugin-graph-minimal-permissions-guidance` | MinimalPermissionsGuidancePlugin instance |
| `devproxy-plugin-graph-minimal-permissions` | MinimalPermissionsPlugin instance |
| `devproxy-plugin-mock-generator` | MockGeneratorPlugin instance |
| `devproxy-plugin-mock-request` | MockResponsePlugin instance |
| `devproxy-plugin-mock-request-config` | MockResponsePlugin config section |
| `devproxy-plugin-mock-response` | MockResponsePlugin instance |
| `devproxy-plugin-mock-response-config` | MockResponsePlugin config section |
| `devproxy-plugin-mock-response-schema` | MockResponsePlugin schema |
| `devproxy-plugin-odata-paging-guidance` | ODataPagingGuidancePlugin instance |
| `devproxy-plugin-graph-odsp-search-guidance` | ODSPSearchGuidancePlugin instance |
| `devproxy-plugin-openai-mock-response` | OpenAIMockResponsePlugin instance |
| `devproxy-plugin-open-api-spec-generator` | OpenApiSpecGeneratorPlugin instance |
| `devproxy-plugin-rate-limiting` | MockResponsePlugin instance |
| `devproxy-plugin-rate-limiting-config` | RateLimitingPlugin config section |
| `devproxy-plugin-rate-limiting-file` | Dev Proxy rate limiting file |
| `devproxy-plugin-rate-limiting-file-schema` | Dev Proxy rate limiting file schema |
| `devproxy-plugin-retry-after` | RetryAfterPlugin instance |
| `devproxy-reporter-json` | JsonReporter instance |
| `devproxy-reporter-markdown` | MarkdownReporter instance |
| `devproxy-reporter-plain-text` | PlainTextReporter instance |

### Status Bar

- Display installed Dev Proxy version
- Display waring when Dev Proxy is not latest version
- Display tick if Dev Proxy is latest version (check based on `newVersionNotification` config setting in Dev Proxy configuration file)
- Display radio tower when Dev Proxy is running
- Display error is Dev Proxy is not installed
