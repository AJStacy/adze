# 4. Logger Configuration

When using logging libraries we like to be able to create a logger in one place, configure it, and then import it in other places throughout our application. The Adze approach to creating global loggers is enabled by two parts which we will explore in the next two sections.

## The Configuration Object

When generating an Adze log you can provide the factory function with a configuration object. For more information on all of the configuration options, see the [Configuration](../config) section of the guide.

```javascript
import adze from 'adze';

const configuration = {
  logLevel: 5,
  useEmoji: true,
};

// This is annoying and cumbersome to have to constantly repeat this with your logs
adze(configuration).timestamp.info("This is an info log which is level 3 with emoji's enabled.");
adze(configuration).timestamp.warn("This is an warn log which is level 2 with emoji's enabled.");
```

What if you want to apply this configuration globally throughout your app? You could export the configuration object and import it throughout your application in order to apply it to your logs, but that would be very cumbersome. Also, what if you would like all of your logs output to have timestamps applied to them globally? You cannot "export" a modifier. So what do we do in this case?

## Sealing the Log Configuration and Modifiers

Adze offers a convenient way of handling these situation through a concept called ["sealing"](../guide/factories.md#seal) that will return a new log factory function to you. All subsequent logs that are generated with this factory function will inherit all of the configuration and modifiers that were "sealed" into it. Here is an example.

```javascript
import adze from 'adze';

const configuration = {
  logLevel: 5,
  useEmoji: true,
};

export const logger = adze(configuration).timestamp.seal();
```

In the example we are appling a configuration and a modifier to a log chain. However, by terminating it with the `seal()` method it has returned a new log factory to our `logger` variable. We are now exporting this new logging factory function to be used throughout our application. Here is an example.

```javascript
import { logger } from './logger.js';

logger().log("This log will print with a timestamp and inherit the configuration from its parent.");
```
