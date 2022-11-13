# 5. Environment Controls

Adze makes it easy to control the logs in your various environment levels due to the simplicity of how loggers can be configured and generated. Usually when working with environments in a node or JavaScript application you would reference a variable assigned to `process.env`. A popular JavaScript library for enabling this is [dotenv](https://github.com/motdotla/dotenv). If you are using a JavaScript framework it likely already supports an API similar or identical to dotenv's API.

## Configure Different Environments

Here is an example of how you could separately configure a development environment from a production environment.

```javascript
import adze from 'adze';

// Setup our defaults to be the values we want in production
let config = {
  logLevel: 2,
  machineReadable: true,
};

// We'll re-assign a configuration to our config object if we are in dev
if (process.env.dev) {
  config = {
    logLevel: 8,
    useEmoji: true,
  };
}

// Export our logger factory
export const logger = adze(config).ns('my-app').timestamp.seal();
```

## Configure Individual Options

You could also make individual configuration values configurable by your environment files like the following example.

```javascript
import adze from 'adze';

const config = {
  // Convert string to number and default a value if undefined or NaN
  logLevel: Number(process.env.logLevel) ?? 2,
  // Convert our string of true to a Boolean of true
  machineReadable: process.env.machineReadable === 'true',
};

export const logger = adze(config).ns('my-app').timestamp.seal();
```
