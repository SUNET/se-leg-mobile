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
    function FingerprintController($scope, SE_LEG_VIEWS, $state, FingerprintService, FingerprintFactory,
      UtilsFactory) {

      var vm = this;
      vm.fingerprintData = '';

      vm.serviceData = undefined;

      $scope.$on('$ionicView.enter', fingerprintProcess);

      /**
       * Method to start the fingerprint process.
       */
      function fingerprintProcess() {
        FingerprintFactory.authenticateFingerprint()
          .then(function (result) {

          })
          .catch(function (error) {

          });
      }

      /**
       * @param result of the plugin.
       */
      function successCallback(result) {
        // TODO: REVIEW FROM HERE
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


