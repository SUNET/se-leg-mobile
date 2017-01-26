You can create your own version of the app combining the existing components, even adding your own components. You can also customize how your app behaves and how it looks by following this guide.

The project has a folder called profiles. This is where profiles live. To define a new profile you must add a json file with the name of your profile to the config folders.

This file looks like:

```
{
   "appId": "com.sunet.se_leg",
   "appName": "SE-LEG",
   "components": ["scanner", "identification", "fingerprint", "message"],
   "constants": "se-leg",
   "icon": "se-leg",
   "images": "se-leg",
   "theme": "se-leg",
   "workflow": "default",
   "splash": "default",
   "version": "1.0.0"
 }
 ```

 With this single file you can define your application with your own values or reusing previously created ones. The fields present in this configuration file are:

 * **appId:** the id of the app being created.
 * **appName:** the name of the app being created.
 * **components:** the list of components being used. It is a precondition to have a folder named as each of the components and a configComponent.json file inside this folder. [More on components configuration.]()
 * **constants:** here you define where to find the files with the constants to be used in your app. You can use either the default ones by setting this to _default_ or define your owns. To do so you just need to add at least a production.json file to a folder with your profile name inside the _profiles/config_ folder.You can add as much as environments you plan to use (i.e. dev, demo, etc).
 * **icon:** here you define the icon app you want your app to display. Again you can use the _default_ icon or you can add your own _icon.png_ file in your folder inside the _profiles/resources_ folder.
 * **images:** here you define the images that your app is using. Again you can use the defaults or add your owns under a folder with your profile name under _profiles/img_.
 * **theme:** here you can define the stylesheet your app. You can use the _default_ or create your own _variables.scss_ file and place it under your folder in _profiles/themes_. [More on theming]()
 * **workflow:** here you define the workflow you want your app to use. To define your own workflow just place a _workflow_ file with the function that defines your workflow in your folder under _profiles/workflow_ folder. [More on defining workflows]()
 * **splash:** here you define the splash image you want your app to display. Again you can use the _default_ splash image or you can add your own _splash.png_ file in your folder inside the _profiles/resources_ folder.
 * **version:** the current version of your app.