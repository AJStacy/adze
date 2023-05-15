---
layout: Home
home: true
quickStartText: Quick Start →
quickStartLink: /guide/
guideText: Guide
guideLink: /guide/
---

::: slot getting-started-is-easy

## Getting Started is Easy

Adze is built with TypeScript from the ground up. Take advantage of all of the benefits of
using TypeScript with your app's logs.
:::

::: slot typescript-support

## First Class TypeScript Support

Adze is built with TypeScript from the ground up. Take advantage of all of the benefits of
using TypeScript with your app's logs.
:::

::: slot chainable-api

## A Fluent, Chainable API

Writing your logs should feel natural which is why Adze chose to implement a [chainable
API](/guide/adze-concepts.md) that feels very much like the standard console API (but better).

```typescript
adze().namespace('Hello').count.log('World!');
```

:::

::: slot everything-configurable

## Everything is Configurable

Setup your logging exactly how you need it. [Everything with Adze is configurable](/config), from
the default log levels down to the emoji's your logs use. You can even create completely
custom log levels. How you use Adze is up to you.

```typescript
adze({ useEmoji: true }).success("I'm configured to use emoji's!");
```

:::

::: slot browser-and-node

## Supports Browser and Node Environments

Run code containing your adze logs seamlessly [in both the browser and node](/guide/installation.md) environments.
There is no extra configuration required.
:::

::: slot shed

## Global Store and Overrides

Adze comes with a component called [Shed](/guide/shed-concepts.md) which provides a global store for your logs. With the global
store you can recall logs from an in-memory cache and override log configurations; effectively
enabling micro-service and micro-frontend architectures.
:::

::: slot footer
Made by [Andrew Stacy](https://github.com/AJStacy) with ❤️

Find Adze on [GitHub](https://github.com/AJStacy/adze)
:::

::: slot learn-more

## And much more...

To learn more about Adze and how to use it in your project, take a look at the [Guide](/guide) and
watch the introduction video.
:::
