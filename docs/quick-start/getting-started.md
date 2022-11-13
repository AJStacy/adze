# 2. Getting Started

Now that we have it installed and we've met our minimum requirements in [step #1](#1-install-adze), we can now start using it in our project.

> To test out Adze for yourself just open the developer tools and you will see instructions for testing the example code.

## Generate a Log

Adze comes with a factory function named `adze` that is your primary entry into using the library. First we will import it and then generate a basic log.

```javascript
import adze from 'adze';

adze().log('Hello world!');
```

If you test this out in your developer tools you can see that this will print out a basic log like `console.log()` except with some nicer default styling applied.

## Change the Log Severity

Now that we've seen how to create a standard log, let's take a look at the other log severity levels we can use.

| Level | Name                                               | Standard Method Used |
| ----- | -------------------------------------------------- | -------------------- |
| 0     | [alert](../guide/default-terminators.md#alert)     | error                |
| 1     | [error](../guide/default-terminators.md#error)     | error                |
| 2     | [warn](../guide/default-terminators.md#warn)       | warn                 |
| 3     | [info](../guide/default-terminators.md#info)       | info                 |
| 4     | [fail](../guide/default-terminators.md#fail)       | info                 |
| 5     | [success](../guide/default-terminators.md#success) | info                 |
| 6     | [log](../guide/default-terminators.md#log)         | log                  |
| 7     | [debug](../guide/default-terminators.md#debug)     | debug                |
| 8     | [verbose](../guide/default-terminators.md#verbose) | debug                |

All of these methods listed in the table above are considered [terminator methods](../guide/default-terminators.md). They are called terminator methods because they end a log chain (which we will cover in the next step).

Let's imagine that our application has now encountered an **error** in a catch statement. We can write our log like this:

```javascript
import adze from 'adze';

try {
  // ...trying to do good things
} catch (e) {
  adze().error('The app has encountered an error!', e);
}
```

In our example we are now using the **error** severity. Also notice that we are passing a second argument into the error method just like we can do with the standard `console.error()` method.

Also, notice in the table above that each log severity has a numbered level. This is important for setting what severity of logs we want printed within our environment. The severity you set will always include the number you set plus all levels that are lesser. For example, if I set my log severity to 3, info level logs will be printed, but so will warn, error, and alert levels because their level value is less than 3.

Pay attention to the right column on the table as well. It indicates that standard console method is used for each of adze's severity levels. This is useful if you want to understand what logs will be hidden/shown if you use the browser's built-in log level filtering.
