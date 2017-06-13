var path = require('path');

module.exports = getConfig();

function getConfig() {


  var distFolder = path.join(global.BASE_DIR, '/dist');
  var buildFolder = path.join(distFolder, 'build');
  var jsFolder = path.join(global.BASE_DIR, '/www/js');
  var mainScssFile = 'se-leg.scss';
  var profilesFolder = path.join(global.BASE_DIR, '/profiles/');
  var resourcesPath = path.join(global.BASE_DIR, '/resources');
  var scssFolder = path.join(global.BASE_DIR, '/scss');

  var config = {};

  config.appJs = {
    source: path.join(global.BASE_DIR, '/www/js/dev.app.js'),
    target: jsFolder
  };

  config.buildFolder = buildFolder;

  config.commons = {
    source: [
      path.join(global.BASE_DIR, '/www/**/*'),
      '!' + path.join(jsFolder, '/**/*.js'),
      '!' + path.join(jsFolder, '/**/*.gz'),
      '!' + path.join(jsFolder, '/libs/**/*'),
      '!' + path.join(global.BASE_DIR, '/www/lib/**/*')
    ],
    target: path.join(buildFolder, '/www')
  };

  config.componentsFolder = {
    source: path.join(global.BASE_DIR, '/components'),
    target: path.join(global.BASE_DIR, '/www/js/components')
  };

  config.configXml = {
    result: path.join(global.BASE_DIR, '/config.xml'),
    source: path.join(profilesFolder, '/config.xml'),
    target: global.BASE_DIR
  };

  config.constants = {
    jsonFolder: path.join(jsFolder + '/core/modules/config/json'),
    source: path.join(jsFolder, '/core/modules/config/template/dev.config.constants.js'),
    target: path.join(jsFolder, '/core/modules/constants'),
    targetFilename: 'config.constants.js'
  };

  config.distFolder = distFolder;

  config.environments = {
    dev: 'dev',
    demo: 'demo',
    pro: 'pro'
  };

  config.fonts = {
    source: path.join(global.BASE_DIR, '/www/lib/ionicons/fonts/*'),
    target: path.join(global.BASE_DIR, '/www/fonts/')
  };

  config.imagesPath = path.join(global.BASE_DIR, '/www/img');

  config.indexHtml = path.join(global.BASE_DIR, '/www/index.html');

  config.js = {
    source: [
      path.join(jsFolder, '/**/*.js'),
      '!' + path.join(jsFolder + '/lib/**/*.js'),
      '!' + path.join(jsFolder + '/**/dev.*.js')
    ],
    target: path.join(buildFolder, 'www/js')
  };

  config.langs = {
    jsonPath: path.join(global.BASE_DIR, '/www/assets/locale'),
    source: path.join(global.BASE_DIR, '/www/js/core/modules/constants/dev.langs.constants.js'),
    target: path.join(global.BASE_DIR, '/www/js/core/modules/constants/'),
    targetFilename: 'langs.constants.js'
  };

  config.locale = {
    source: path.join(global.BASE_DIR, '/node_modules/angular-i18n/*.js'),
    target: path.join(global.BASE_DIR, '/www/assets/locale/i18n')
  };

  config.main = {
    source: path.join(jsFolder, '/dev.main.js'),
    target: jsFolder,
    targetFilename: 'main.js'
  };

  config.profilesFolders = {
    config: path.join(profilesFolder, '/config'),
    constants: path.join(profilesFolder, '/constants'),
    images: path.join(profilesFolder, '/img'),
    plugins: path.join(profilesFolder, '/plugins'),
    resources: path.join(profilesFolder, '/resources'),
    sender: path.join(profilesFolder, '/sender'),
    theme: path.join(profilesFolder, '/themes'),
    workflow: path.join(profilesFolder, '/workflow')
  };

  config.requireDependencies = JSON.stringify(getDependencies());

  config.resources = {
    android: {
      source: path.join(resourcesPath, 'android', 'splash', '**/*'),
      target: path.join(global.BASE_DIR, '/www/res/screen/android')
    },
    source: [path.join(resourcesPath, '/**/*')],
    target: path.join(buildFolder, '/resources')
  };

  config.resourcesPath = resourcesPath;

  config.scss = {
    mainFile: mainScssFile,
    source: scssFolder + '/dev.' + mainScssFile,
    target: scssFolder
  };

  config.senderFilename = 'sender.js';
  config.senderSource = path.join(global.BASE_DIR, '/www/js/core/modules/sender/dev.sender.custom.process.data.factory.js');
  config.senderTargetFilename = 'sender.custom.process.data.factory.js';
  config.senderTargetFolder = path.join(global.BASE_DIR, '/www/js/core/modules/sender');

  config.stringDependencies = getStringDependencies();

  config.styles = {
    autoprefixerOptions: { browsers: ['last 2 version', 'safari 5', 'ios 6', 'android 4'] },
    glob: path.join(global.BASE_DIR, '/www/css/*.css'),
    source: path.join(scssFolder, mainScssFile),
    target: path.join(global.BASE_DIR, '/www/css'),
    targetFilename: 'styles.css',
    targetMinFilename: 'styles.min.css',
    watchPaths: [path.join(scssFolder, '/**/*.scss'), path.join(jsFolder, '/**/*.scss')]
  };

  config.variablesFilename = 'variables.scss';
  config.variablesFolder = scssFolder + '/partials';

  config.views = {
    source: path.join(global.BASE_DIR, '/www/js/core/modules/constants/dev.views.constants.js'),
    target: path.join(global.BASE_DIR, '/www/js/core/modules/constants/'),
    targetFilename: 'views.constants.js'
  };

  config.workflowFilename = 'workflow.js';
  config.workflowSource = path.join(global.BASE_DIR, '/www/js/main/dev.main.factory.js');
  config.workflowTargetFilename = 'main.factory.js';
  config.workflowTargetFolder = path.join(global.BASE_DIR, '/www/js/main');

  config.wwwFolder = path.join(global.BASE_DIR, '/www');

  config.zipFiles = path.join(global.BASE_DIR, '/**/lib/**/*.gz');

  return config;
}

function getDependencies() {
  return {
    angular: '../lib/ionic/js/ionic.bundle.min',
    text: '../lib/requirejs-text/text',
    ngCordova: '../lib/ngCordova/dist/ng-cordova',
    ngTranslate: '../lib/angular-translate/angular-translate',
    ngTranslateLoaderStaticFiles: '../lib/angular-translate-loader-static-files/angular-translate-loader-static-files',
    ngDynamicLocale: '../lib/angular-dynamic-locale/tmhDynamicLocale.min',
    ngTranslateHandlerLog: '../lib/angular-translate-handler-log/angular-translate-handler-log',
    ngTranslateStorageLocal: '../lib/angular-translate-storage-local/angular-translate-storage-local.min',
    ngTranslateStorageCookie: '../lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
    ngCookies: '../lib/angular-cookies/angular-cookies.min',
    ngSanitize: '../lib/angular-sanitize/angular-sanitize.min'
  };
}

function getStringDependencies() {

  var dependencies = getDependencies();

  var indexDependencies = {
    RequireJS: '/lib/requirejs/require'
  };

  var keys = Object.keys(dependencies);

  var mappedDependencies = keys.map(function (key) {
    var dependency = dependencies[key];
    dependency = dependency.replace('..', '').replace('./', '/js/');
    return 'www' + dependency + '.js';
  });

  var indexKeys = Object.keys(indexDependencies);

  var mappedIndexDependencies = indexKeys.map(function (key) {
    return 'www' + indexDependencies[key] + '.js';
  });

  return mappedDependencies.concat(mappedIndexDependencies);
}
