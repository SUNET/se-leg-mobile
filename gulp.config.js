module.exports = function () {
  var css = './www/css/';
  var allSass = ['./scss/**/*.scss', './www/**/*.scss'];
  var mainSass = ['./scss/ionic.app.scss', './scss/se-leg.scss'];
  var alljs = ['./www/js/**/*.js', '!./www/js/lib/**/*.js', './*.js', '!./**/dev.*.js'];
  var devCommons = ['./www/**/*', '!./www/js/**/*.js', '!./www/js/**/*.gz', '!./www/js/libs/**/*', '!./www/lib/**/*'];
  var build = 'dist/build';
  var devFonts = ['./www/lib/ionicons/fonts/*'];
  var destFonts = './www/fonts/';
  var distJS = 'dist/build/www/js';

  var dependencies = {
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

  var indexDependencies = {
    RequireJS: '/lib/requirejs/require'
  };

  function getStringDependencies() {
    var result = [];
    var keys = Object.keys(dependencies);
    for (var i = 0; i < keys.length; i++) {
      dependencies[keys[i]] = dependencies[keys[i]].replace('..', '');
      dependencies[keys[i]] = dependencies[keys[i]].replace('./', '/js/');
      result.push('www' + dependencies[keys[i]] + '.js')
    }

    keys = Object.keys(indexDependencies);
    for (var i = 0; i < keys.length; i++) {
      result.push('www' + indexDependencies[keys[i]] + '.js');
    }

    return result;
  }

  var config = {
    origin: {
      allSass: allSass,
      mainSass: mainSass,
      alljs: alljs,
      devCommons: devCommons,
      devFonts: devFonts
    },
    dest: {
      css: css,
      build: build,
      fonts: destFonts,
      js: distJS
    },
    requireDependencies: JSON.stringify(dependencies),
    stringDependencies: getStringDependencies()
  };

  return config;
};
