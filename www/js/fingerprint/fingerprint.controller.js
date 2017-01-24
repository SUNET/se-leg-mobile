/**
 * Fingerprint controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */

(function () {
  define(['./fingerprint.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('FingerprintController', FingerprintController);
    /* @ngInject */
    function FingerprintController($scope, SE_LEG_VIEWS, $state, FingerprintService, FingerprintScannerFactory) {

      var vm = this;
      vm.fingerprintData = '';

      vm.serviceData = undefined;
      vm.fingerprint = fingerprint;

      $scope.$on('$ionicView.enter', fingerprint);



      function fingerprint() {

        FingerprintScannerFactory.verifyFingerprint()
          .then(successCallback)
          .catch(errorCallback);
      }

      /**
       * @param result of the plugin.
       */
      function successCallback(result) {
        if (result.withFingerprint) {
          vm.serviceData = "identity=" + $state.params.nin + "&qrcode=" + $state.params.qr
          vm.serviceData = vm.serviceData.split(" ").join("");
          FingerprintService.sendByPost(vm.serviceData).then(function (data) {
            $state.go(SE_LEG_VIEWS.MESSAGE);
          }).catch(function (err) {
            $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: err.errorMessage});
          });
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


