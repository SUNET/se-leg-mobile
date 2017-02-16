module.exports = getConfig();

function getConfig() {

  var mainScssFile = 'se-leg.scss';
  var profilesFolder = global.BASE_DIR + '/profiles/';
  var scssFolder = global.BASE_DIR + '/scss';

  var config = {};

  config.appJs = {
    source: global.BASE_DIR + '/www/js/dev.app.js',
    target: global.BASE_DIR + '/www/js'
  };

  config.componentsFolder = {
    source: global.BASE_DIR + '/components',
    target: global.BASE_DIR + '/www/js/components'
  };

  config.configXml = {
    source: profilesFolder + 'config.xml',
    target: global.BASE_DIR
  };

  config.constantsPath = global.BASE_DIR + '/www/js/core/modules/config/json';

  config.imagesPath = global.BASE_DIR + '/www/img';

  config.langs = {
    jsonPath: global.BASE_DIR + '/www/assets/locale',
    source: global.BASE_DIR + '/www/js/core/modules/constants/dev.langs.constants.js',
    target: global.BASE_DIR + '/www/js/core/modules/constants/',
    targetFilename: 'langs.constants.js'
  };

  config.profilesFolders = {
    config: profilesFolder + 'config',
    constants: profilesFolder + 'constants',
    images: profilesFolder + 'img',
    plugins: profilesFolder + 'plugins',
    resources: profilesFolder + 'resources',
    sender: profilesFolder + 'sender',
    theme: profilesFolder + 'themes',
    workflow: profilesFolder + 'workflow'
  };

  config.resourcesPath = global.BASE_DIR + '/resources';

  config.scss = {
    mainFile: mainScssFile,
    source: scssFolder + '/dev.' + mainScssFile,
    target: scssFolder
  };

  config.senderFilename = 'sender.js';
  config.senderSource = global.BASE_DIR + '/www/js/core/modules/sender/dev.sender.custom.process.data.factory.js';
  config.senderTargetFilename = 'sender.custom.process.data.factory.js';
  config.senderTargetFolder = global.BASE_DIR + '/www/js/core/modules/sender';

  config.variablesFilename = 'variables.scss';
  config.variablesFolder = scssFolder + '/partials';

  config.views = {
    source: global.BASE_DIR + '/www/js/core/modules/constants/dev.views.constants.js',
    target: global.BASE_DIR + '/www/js/core/modules/constants/',
    targetFilename: 'views.constants.js'
  };

  config.workflowFilename = 'workflow.js';
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

  return config;
}