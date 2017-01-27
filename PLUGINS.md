# Plugins

SE-leg uses a set of common Cordova plugins that are already added to the base _config.xml_ file. There are, though a set of plugins that are only needed by some components. This plugins are registered in the _plugins.json_ file in the _profiles/plugins_ folder. If you need to add more plugins for your own components you should add them here.

```
{
  "fingerPrint": [
    {
      "name": "cordova-plugin-touch-id",
      "spec": "~3.1.2",
      "source": "npm"
    },
    {
      "name": "cordova-plugin-android-fingerprint-auth",
      "spec": "https://github.com/natete/cordova-plugin-android-fingerprint-auth.git",
      "source": "git"
    }
  ],
  "barcodeScanner": [
    {
      "name": "phonegap-plugin-barcodescanner",
      "spec": "6.0.3",
      "source": "npm",
      "variables": [
        {
          "name": "CAMERA_USAGE_DESCRIPTION",
          "value": "Allow your camera to scan the QR"
        }
      ]
    }
  ]
}
```

This json file contains an object which keys are available plugins. Each key contains an array of definitions of the plugin. This way you can define a plugin that uses different implementations for each system as shown in the example.

Each plugin implementation is defined by:

* **name:** the name of the plugin.
* **spec:** the version or repository of the plugin.
* **source:** the source of the plugin (usually npm or git).
* **variables:** optional field to define the variables to be passed to a plugin. Each variable is a _name/value_ pair.

With this information the corresponding gulp task will create the plugin tag to be inserted in _config.xml_.

```
<plugin name="phonegap-plugin-barcodescanner" source="npm" spec="6.0.3">
    <variable name="CAMERA_USAGE_DESCRIPTION" value="Allow your camera to scan the QR" />
</plugin>
```
