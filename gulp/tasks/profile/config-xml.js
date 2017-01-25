var plugins = require('gulp-load-plugins')({ lazy: true });
var _ = require('lodash');

var utils = require(global.GULP_DIR + '/utils');
var config = require(global.GULP_DIR + '/gulp.config');

module.exports = {
  dep: [],
  fn: taskFunction

};

// TODO change widget-id, appName and other things that need to be changed on config.xml

function taskFunction(gulp, done) {
  utils.log('*** Profiling config.xml ***');

  var components = global.profileConfig.components;

  var requestedPlugins = _.uniq(components.map(extractPluginsFromComponent));

  var pluginsTags = getPluginTags(requestedPlugins);

  return addPluginsToConfigXml(pluginsTags);

  ///////////////////////
  // Auxiliary Methods //
  ///////////////////////
  function extractPluginsFromComponent(component) {
    var componentConfigPath = [config.componentsFolder.source, component, 'configComponent'].join('/');

    var componentConfig = require(componentConfigPath);

    return componentConfig.plugins;
  }

  function getPluginTags(requestedPlugins) {
    var availablePlugins = require(config.profilesFolders.plugins + '/plugins');

    return requestedPlugins.map(function (plugin) {
      var pluginObject = availablePlugins[plugin];

      return convertPluginObjectToPluginTag(pluginObject);
    });
  }

  function convertPluginObjectToPluginTag(pluginObject) {
    var closingTag = getClosingPluginTag(pluginObject);

    return ['<plugin name=', pluginObject.name, ' source=', pluginObject.source, ' spec=', pluginObject.spec, closingTag].join('"');
  }

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

  function convertVariableObjectToVariableTag(variableObject) {
    return ['<variable name=', variableObject.name, ' value=', variableObject.value, ' />'].join('"');
  }

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
