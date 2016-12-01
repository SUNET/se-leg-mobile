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
    "ngTranslateStorageLocal": "../lib/angular-translate-storage-local/angular-translate-storage-local.min",
    "ngTranslateStorageCookie": "../lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min",
    "ngCookies": "../lib/angular-cookies/angular-cookies.min",
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
      .run(function ($ionicPlatform, MainBackFactory, $rootScope, SE_LEG_VIEWS, $state) {
        $ionicPlatform.ready(function () {

          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

          }

          // Show app in normal screen with status bar
          ionic.Platform.fullScreen(false, true);
        });

        // Detect back button to cancel screen if trying to go back (Android only)
        MainBackFactory.init();

        /**
         * @return {
         *      isAvailable:boolean,
         *      isHardwareDetected:boolean,
         *      hasEnrolledFingerprints:boolean
         *   }
         */
        function isAvailableSuccess(result) {
          console.log("FingerprintAuth available: " + JSON.stringify(result));
          if (result.isHardwareDetected) {
            if (!result.isAvailable) {
              console.log("Fingerprint auth available, but no fingerprint registered on the device");
              $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notRegistred'});
            }
          } else {
            $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notFingerprint'});
          }
        }

        function isAvailableError(message) {
          // fingerprint auth isn't available
          console.log("isAvailableError(): " + message);
          $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notDetectFingerprintDevice'});
        }

        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);

      });

    // bootstraps angular application. Use this instead of using ng-app
    angular.element().ready(function () {
      angular.bootstrap(document, ['app']);
    });
  });
})();
