/**
 * Main back button factory
 * @param {type} angular
 * @author María Villalba <mavillalba@emergya.com>
 * @since Tue Nov 22 2016
 */

(function () {
  define(['./core.factories.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('MainBackFactory', MainBackFactory);

    /* @ngInject */
    function MainBackFactory($state, $ionicPlatform, $ionicHistory, SE_LEG_VIEWS) {
      var factory = this;
      factory.init = init;

      function init() {
        hardwareBackButtonDef();
      }

      /**
       * Hardware back button behavior definition.
       * @returns {undefined}
       */
      function hardwareBackButtonDef() {
        $ionicPlatform.registerBackButtonAction(function () {
          commonBackBehaviour();
        }, 100);
      }

      /**
       * Back common function.
       * @returns {undefined}
       */
      function commonBackBehaviour() {

        if ($ionicHistory.currentView()) {

          var currentView = $ionicHistory.currentView().stateName;

          switch (currentView) {
            case SE_LEG_VIEWS.SCANNER:
              if (navigator && navigator.app) {
                navigator.app.exitApp();
              }
              break;
            case SE_LEG_VIEWS.MESSAGE:
              var message = $ionicHistory.currentView().stateParams.msg;

              if (message === "fingerprint.error.notFingerprint") {
                if (navigator && navigator.app) {
                  navigator.app.exitApp();
                }
              } else {
                // message is empty
                if ($ionicHistory.currentView().stateParams.errorScreen) {
                  $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'back.msg'});
                } else {
                  // everithing was fine
                  ; // do nothing (#183632)
                }
              }
              break;
            default:
              $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'back.msg'});
              break;
          }

        }

      }

      return factory;
    }
  });
})();
