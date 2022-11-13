# 7. Log Listeners

Now that we have reviewed the basics of creating logs, applying modifiers, and how labels work, let's dive deeper into the concept of the Shed. Remember that in the previous step we ran the [createShed](../guide/shed-concepts.md#) function in order to generate our global [Shed](../guide/shed-concepts.md) store.

The Shed is an optional component that enables features such as:

1. [Modifiers](../guide/modifiers.md) that require [labels](../guide/modifiers.md#label).
2. [Log caching (for recalling logs)](../guide/shed-concepts.md#recalling-logs).
3. [Global log configuration overrides](../guide/shed-concepts.md).
4. [Log listeners](../guide/shed-concepts.md#listeners).

Most applications will want to generate a global Shed, but it was kept optional for use with small private modules that aren't making use of any of the features of Shed but that might need to be configured from another global scope. This isn't important to understand right now, so we'll move on for now.

Let's look at what is likely the most powerful feature of Adze which is [log listeners](../guide/).

```javascript
import adze, { createShed } from 'adze';

const shed = createShed();
```
