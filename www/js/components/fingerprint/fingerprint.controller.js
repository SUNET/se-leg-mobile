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
      MainFactory, UtilsFactory) {

      var vm = this;
      vm.fingerprintData = '';
      vm.serviceData = undefined;
      // by default actions
      var onFingerprintValidationSuccess = function (result) {
        MainFactory.handleNextComponent();
      };
      var onFingerprintValidationFailure = function (error) {
        UtilsFactory.closeApp({title: 'fingerprintVerification.error.title', text: 'fingerprintVerification.error.text'
        });
      };
      $scope.$on('$ionicView.enter', onEnter);


      /**
       * Method called once the user accesses to the module.
       */
      function onEnter() {
        if ($state.params) {
          // initialization of the parameters
          if ($state.params.onFingerprintValidationSuccess) {
            onFingerprintValidationSuccess = $state.params.onFingerprintValidationSuccess;
          }

          if ($state.params.onFingerprintValidationFailure) {
            onFingerprintValidationFailure = $state.params.onFingerprintValidationFailure;
          }
        }
        fingerprintProcess();
      }

      /**
       * Method to start the fingerprint process.
       */
      function fingerprintProcess() {
        FingerprintFactory.authenticateFingerprint()
          .then(function (result) {
            onFingerprintValidationSuccess(result);
          })
          .catch(function (error) {
            onFingerprintValidationFailure(error);
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


