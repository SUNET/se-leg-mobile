module.exports = getConfig();

function getConfig() {

  var profilesFolder = global.BASE_DIR + '/profiles/';

  var config = {};

  config.componentsFolder = {
    source: global.BASE_DIR + '/components',
    target: global.BASE_DIR + '/www/js/components'
  }

  config.configXml = {
    source: profilesFolder + 'config.xml',
    target: global.BASE_DIR
  };

  config.profilesFolders = {
    theme: profilesFolder + 'themes',
    workflow: profilesFolder + 'workflow',
    config: profilesFolder + 'config',
    plugins: profilesFolder + 'plugins'
  };

  config.variablesFilename = 'variables.scss';
  config.variablesFolder = global.BASE_DIR + '/scss/partials';

  config.workflowFilename = 'workflow';
  config.workflowSource = global.BASE_DIR + '/www/js/main/dev.main.factory.js';
  config.workflowTargetFilename = 'main.factory.js';
  config.workflowTargetFolder = global.BASE_DIR + '/www/js/main';

  config.htmlmin = {
    options: {
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    }
  };
}