var plugins = require('gulp-load-plugins')({ lazy: true });
var _ = require('lodash');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

/**
 * Configures the config.xml file adding the plugins needed according to the components needs, app name.
 */
module.exports = {
  dep: [],
  fn: taskFunction

};

// TODO change widget-id, appName and other things that need to be changed on config.xml
function taskFunction(gulp, done) {
  utils.log('*** Profiling config.xml ***');

  var components = global.profileConfig.components;

  var requestedPlugins = getRequestedPlugins(components);

  var pluginsTags = getPluginTags(requestedPlugins);

  return addPluginsToConfigXml(pluginsTags);

  ///////////////////////
  // Auxiliary Methods //
  ///////////////////////
  /**
   * Get the list of needed plugins according to the components list.
   * @param components the list of components required by the application.
   * @returns {string[]} the list of requested plugins avoiding duplications.
   */
  function getRequestedPlugins(components) {
    return _.uniq(components.map(extractPluginsFromComponent));
  }

  /**
   * Extract the list of plugins needed for a given component from its json config file.
   * @param component the component to get the plugins from.
   * @returns {string[]} the list of plugins needed for the given component from its json config file.
   */
  function extractPluginsFromComponent(component) {
    var componentConfigPath = [config.componentsFolder.source, component, 'configComponent'].join('/');

    var componentConfig = require(componentConfigPath);

    return componentConfig.plugins;
  }

  /**
   * Get the list of all the plugins tags corresponding to the given list of plugins.
   * @param requestedPlugins the list of plugins to be converted to the plugins tags.
   * @return {string[]} the list of plugin tags.
   */
  function getPluginTags(requestedPlugins) {
    var availablePlugins = require(config.profilesFolders.plugins + '/plugins');

    return requestedPlugins.map(function (plugin) {
      var pluginObject = availablePlugins[plugin];

      return convertPluginObjectToPluginTag(pluginObject);
    });
  }

  /**
   * Converts a plugin object to the string that represents a tag that follows Cordova requirements.
   * @param pluginObject the plugin object to be converted.
   * @returns {string} the string that represents a tag that follows Cordova requirements.
   */
  function convertPluginObjectToPluginTag(pluginObject) {
    var closingTag = getClosingPluginTag(pluginObject);

    return ['<plugin name=', pluginObject.name, ' source=', pluginObject.source, ' spec=', pluginObject.spec, closingTag].join('"');
  }

  /**
   * Returns the closing part of a given plugin tag taking into account if it has or not variables defined.
   * @param pluginObject
   * @returns {string} the closing part of a given plugin tag
   */
  function getClosingPluginTag(pluginObject) {
    var result;
    if (pluginObject.variables && pluginObject.variables.length > 0) {
      var variables = pluginObject.variables.map(convertVariableObjectToVariableTag).join('\n');
      return ['>', variables, '</plugin>'].join('\n');
    } else {
      result = ' />'
    }
    return result;
  }

  /**
   * Converts a variable object into a variable tag that follows Cordova requirements.
   * @param variableObject the variable object to be converted.
   * @returns {string} a variable tag that follows Cordova requirements.
   */
  function convertVariableObjectToVariableTag(variableObject) {
    return ['<variable name=', variableObject.name, ' value=', variableObject.value, ' />'].join('"');
  }

  /**
   * Adds the list of plugins to the template config.xml file and copies the result to the project folder.
   * @param pluginTags the list of plugins to be added.
   */
  function addPluginsToConfigXml(pluginTags) {
    return gulp.src(config.configXml.source)
      .pipe(plugins.replaceTask(
        {
          patterns: [
            {
              match: /<plugins-placeholder \/>/g,
              replacement: pluginTags.join('\n')
            }
          ]
        }
      ))
      .pipe(gulp.dest(config.configXml.target));
  }
}
