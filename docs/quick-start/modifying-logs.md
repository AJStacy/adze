# 3. Modifying Logs

Now that we have explored how to create a basic log and change it's severity, let's dive into the concept of modifiers that is unique to the Adze library.

Sometimes when we are creating logs we would like to apply some extra information to them or change the behavior of how they are rendered. For instance, we may want to know the time and date at which a log was generated so that we can correlate the log to a specific event. To do this with Adze you would use the `timestamp` modifier.

```javascript
import adze from 'adze';

adze().timestamp.log('Something happened.');
```

## Chaining Log Modifiers

Why stop with just one modifier when you can have more? The Adze API allows you to infinitely chain modifiers between the log factory function and the terminator method. Let's look at a case where we want to apply a [timestamp](../guide/modifiers.md#timestamp) and a [namespace](../guide/modifiers.md#namespace--ns) to a log.

```javascript
import adze from 'adze';

adze().timestamp.namespace('my-module').log('Logging something in my module.');
```

The namespace modifier allows us to add some meta data about what part of our project is generating the log. This is useful for filtering and controlling our logs, which we will get into later.

## Using the Label Modifier

Adze ships with a modifier method named `label()` that applies a label to a log and is used for grouping multiple logs together globally. If you refer to the [console logging standard on MDN](https://developer.mozilla.org/en-US/docs/Web/API/console) you will see that some of the console log methods like `console.count()` accept a **label** parameter.

The problem with the standard API is that the `count` method is always of a level of **info**. What if we want to count logs with a debug level? With the current JavaScript standard it is impossible to do so with the `console.count()` method. Because of this, Adze takes a different approach to log methods that require a label. Adze gives you [label](../guide/modifiers.md#label) and [count](../guide/modifiers.md#count) as modifiers which enables you to terminate it at whatever log level you deem appropriate.

There is however one caveat to using modifiers that require a label (such as `count`). Labels are dependent upon the existence of a global [Shed](../guide/using-shed.md) store for tracking the labeled log group globally. We will dive deeper into Shed and the global context a bit later in this tutorial, but first let's take a look at some code below to hopefully help this make more sense.

```javascript
import adze, { createShed } from 'adze';

// Execute this function to create our global Shed instance
createShed();

// Let's write a loop to test out the counting modifier
for (let i = 0; i < 10; i++) {
  adze().label('my-counter').count.log('Counting iterations of this loop.');
}
```

Notice that as the for loop in the code above executes it will generate 10 logs. In order for them to "know about each other" they all share a `Label` object under the hood. This enables each log to increment the counter that is tracked on the Label instance when the log is created. The Label instance is actually stored within the Shed. This behavior mimics the standard behavior of `console.count()`. You can read more about the standard count method at this link: [https://developer.mozilla.org/en-US/docs/Web/API/Console/count](https://developer.mozilla.org/en-US/docs/Web/API/Console/count).
