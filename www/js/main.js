/**
 * Main application required dependencies.
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
  // Hook to insert paths by a gulp task
  var paths;
  paths = {"angular": "../lib/ionic/js/ionic.bundle.min", "text": "../lib/requirejs-text/text",
    "ngCordova": "../lib/ngCordova/dist/ng-cordova", "ngTranslate": "../lib/angular-translate/angular-translate",
    "ngTranslateLoaderStaticFiles": "../lib/angular-translate-loader-static-files/angular-translate-loader-static-files",
    "ngDynamicLocale": "../lib/angular-dynamic-locale/tmhDynamicLocale.min",
    "ngTranslateHandlerLog": "../lib/angular-translate-handler-log/angular-translate-handler-log",
    "ngTranslateStorageLocal": "../js/lib/node_modules/angular-translate-storage-local/angular-translate-storage-local.min",
    "ngTranslateStorageCookie": "../js/lib/node_modules/angular-translate-storage-cookie/angular-translate-storage-cookie.min",
    "ngCookies": "../js/lib/node_modules/angular-cookies/angular-cookies.min",
    "ngSanitize": "../lib/angular-sanitize/angular-sanitize.min"}

  require.config({
    paths: paths,
    shim: {
      angular: {
        exports: 'angular'
      },
      ngCordova: ['angular'],
      ngTranslate: ['angular'],
      ngTranslateLoaderStaticFiles: ['angular', 'ngTranslate'],
      ngDynamicLocale: ['angular'],
      ngTranslateHandlerLog: ['ngTranslate'],
      ngTranslateStorageLocal: ['ngTranslate'],
      ngTranslateStorageCookie: ['ngTranslate'],
      ngCookies: ['angular'],
      ngSanitize: ['angular']
    },
    priority: [
      'angular', 'ngCordova'
    ]
  });
  require([
    'angular',
    'app',
    'ngCordova'
  ], function (angular, appName, ngCordova) {
    'use strict';
    angular.module(appName)
      .run(function ($ionicPlatform, MainBackFactory) {
        $ionicPlatform.ready(function () {

          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(false);

          }

          // Show app in normal screen with status bar
          ionic.Platform.fullScreen(false, true);
        });

        // Detect back button to cancel screen if trying to go back (Android only)
        MainBackFactory.init();
      });

    // bootstraps angular application. Use this instead of using ng-app
    angular.element().ready(function () {
      angular.bootstrap(document, ['app']);
    });
  });
})();
