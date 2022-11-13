# 6. Global Context

When using Adze there are many features that rely on the global context. Adze exposes a couple of functions, `createShed()` and `removeShed()`, for generating a global context container and tearing it down. This global context container enables the `label()` modifier which we discussed in Step 3, but it also provides us with many other nice features.

## Creating a Shed

In order to create our Shed (global context container), we must first execute the `createShed()` factory function. This factory function will create a variable in the `Window` scope in web browsers or the `global` scope in node environments. Whenever a log is generated after the Shed was constructed, it will cache the log (up to a default maximum of 300). You can then recall these logs using the Shed tools.

When constructing a new Shed you can also provide it with a configuration object. It will also return a reference to itself that can be used for calling any Shed methods.

Let's take a look at an example of creating our Shed and overriding some other log configuration with global configuration.

```javascript
import adze, { createShed } from 'adze';

// Create a Shed and get the reference to it
const shed = createShed({
  // We'll also override all other Adze configurations here.
  globalCfg: {
    logLevel: 
  },
});

adze().label('my-label').warn("This is a warning log.");
adze().label('my-label').log("This is a regular log.");
```


You might be thinking, "Why would I want to recall logs?" In most situations, recalling logs isn't something you need because you can just refresh your browser. But there are situations in production environments where recalling logs can be extremely helpful. Consider a situation where a consumer of your application is experiencing a bug, however, you have your application's log level set to 2 in production (which will hide anything other than alerts, errors, and warnings). If you have access to the consumer's machine, or if you guide them, you can call the Shed tools in the browser console to recall logs of any level. This can help you find debugging information in these types of situations. We won't be diving deep into the Shed tools in this tutorial, but if you want more information, visit the section of the [Guide about $shed.tools](https://adzejs.com/guide/using-shed.html#shed-tools).
