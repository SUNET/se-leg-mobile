/**
 * Fingerprint controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */

(function () {
  define(['./fingerprint.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .controller('FingerprintController', FingerprintController);

    /* @ngInject */
    function FingerprintController($scope, $state, SE_LEG_VIEWS, SenderService, FingerprintFactory,
      MainFactory, UtilsFactory) {

      var vm = this;
      vm.fingerprintData = '';
      vm.serviceData = undefined;

      // by default actions
      var onFingerprintValidationSuccess = function (result) {
        MainFactory.handleNextComponent();
      };
      var onFingerprintValidationFailure = function (error) {
        UtilsFactory.closeApp({
          title: 'fingerprintVerification.error.title',
          text: 'fingerprintVerification.error.text',
          isError: true
        });
      };
      $scope.$on('$ionicView.enter', onEnter);

      activate();

      /**
       * Needed activation functionalities.
       */
      function activate() {

      }

      /**
       * Method called once the user accesses to the module.
       */
      function onEnter() {
        if ($state.params && $state.params.data) {
          // initialization of the parameters
          if ($state.params.data.onFingerprintValidationSuccess) {
            onFingerprintValidationSuccess = $state.params.data.onFingerprintValidationSuccess;
          }

          if ($state.params.data.onFingerprintValidationFailure) {
            onFingerprintValidationFailure = $state.params.data.onFingerprintValidationFailure;
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

      // TODO: REFACTOR FROM HERE

      /**
       * @param result of the plugin.
       */
      function successCallback(result) {
        // TODO: REVIEW FROM HERE
        if (result.withFingerprint) {
          vm.serviceData = "identity=" + $state.params.nin + "&qrcode=" + $state.params.qr
          vm.serviceData = vm.serviceData.split(" ").join("");
          SenderService.sendByPost(vm.serviceData).then(function (data) {
            $state.go(SE_LEG_VIEWS.MESSAGE);
          }).catch(function (err) {
            $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: err.errorMessage});
          });
        } else if (result.withPassword) {
          $state.go(SE_LEG_VIEWS.MESSAGE);
        }
      }

    }
  });
})();


