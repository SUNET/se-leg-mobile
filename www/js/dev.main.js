/**
 * Main application required dependencies.
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
  // Hook to insert paths by a gulp task
  var paths;

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
  ], function (angular, appName) {
    'use strict';

    angular
      .module(appName)
      .run(run);

    // bootstraps angular application. Use this instead of using ng-app
    angular.element().ready(function () {
      angular.bootstrap(document, ['app']);
    });
  });


  /* @ngInject */
  function run($ionicHistory, $ionicPlatform, $rootScope, MainFactory, UtilsFactory, SE_LEG_GLOBAL) {
    $ionicPlatform.ready(function () {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

      // Show app in normal screen with status bar
      ionic.Platform.fullScreen(false, true);

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        if (!toParams.handled && UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
          event.preventDefault();
          MainFactory.handlePreviousComponent();
        }
      });

      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
        if ($ionicHistory.viewHistory().currentView) {
          $ionicHistory.viewHistory().currentView.stateParams.handled = false;
        }
      });

      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        e.stopPropagation();

        MainFactory.handlePreviousComponent();
      }, 100);
    });

    // Detect back button to cancel screen if trying to go back (Android only)
    //MainBackFactory.init();
  }
})();
