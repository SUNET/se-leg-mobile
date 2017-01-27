# Components

Components are the views that you can use to compose your application. Components live in the _components_ folder. A component must have a _configComponent.json_ file to define the plugins the component needs.

```
{
  "plugins": ["fingerPrint"]
}
```

All the plugins must be present in the _plugins.json_ file ([More on Plugins](PLUGINS.md))

You can add your own components by following the same structure as the default ones.