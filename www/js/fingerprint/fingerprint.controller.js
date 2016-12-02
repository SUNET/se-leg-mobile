/**
 * Fingerprint controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./fingerprint.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('FingerprintController', FingerprintController);
    /* @ngInject */
    function FingerprintController($scope, SE_LEG_VIEWS, $state) {

      var vm = this;
      vm.fingerprintData = '';

      vm.fingerprint = fingerprint;

      $scope.$on('$ionicView.enter', fingerprint);



      function fingerprint() {
        // it is available
        var client_id = "Your client ID";
        var client_secret = "A very secret client secret (once per device)";

        FingerprintAuth.show({
          clientId: client_id,
          clientSecret: client_secret,
          disableBackup: true
        }, successCallback, errorCallback);
      }

      /**
       * @return {withFingerprint:base64EncodedString, withPassword:boolean}
       */
      function successCallback(result) {
        if (result.withFingerprint) {
          $state.go(SE_LEG_VIEWS.MESSAGE);
        } else if (result.withPassword) {
          $state.go(SE_LEG_VIEWS.MESSAGE);
        }
      }

      function errorCallback(error) {
        if (error === "Cancelled") {
          $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.cancelled'});
        } else {
          $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notAvailable'});
        }
      }

    }
  });
})();


