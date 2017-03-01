/**
 * Scanner controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */

(function () {
  define(['./scanner.module', 'text!./scanner-modal.html'], function (moduleName, modalTemplate) {
    'use strict';
    angular
      .module(moduleName)
      .controller('ScannerController', ScannerController);

    /* @ngInject */
    function ScannerController($scope, $state, SE_LEG_VIEWS, ScannerFactory, UtilsFactory, MainFactory, DataFactory) {

      var vm = this;

      // by default actions
      vm.onScannerValidationSuccess = MainFactory.handleNextComponent;

      vm.onScannerValidationFailure = function (error) {
        // error handle
        if (error === 'cancelled') {
          UtilsFactory.closeApp();
        } else {
          // An error occurred
          UtilsFactory.closeApp({ message: 'scanner.error', isError: true });
        }
      };
      $scope.$on('$ionicView.enter', onEnter);

      activate();

      function activate() {
      }

      /**
       * Method to be executed once the user accesses to the scanner component.
       */
      function onEnter() {
        // clearing previous data
        DataFactory.clear(SE_LEG_VIEWS.SCANNER);

        if ($state.params && $state.params.data) {
          // initialization of the parameters
          if ($state.params.data.onScannerValidationSuccess) {
            vm.onScannerValidationSuccess = $state.params.data.onScannerValidationSuccess;
          }

          if ($state.params.data.onScannerValidationFailure) {
            vm.onScannerValidationFailure = $state.params.data.onScannerValidationFailure;
          }
        }
        ScannerFactory.allowNeededPermissions()
          .then(scan)
          .catch(function (error) {
            UtilsFactory.closeApp();
          });
      }

      /**
       * Requests camera permission and display the scanner when granted.
       */
      function scan() {
        ScannerFactory
          .scan()
          .then(function (result) {
            // saving the associated data
            DataFactory.save(SE_LEG_VIEWS.SCANNER, result.text);
            vm.onScannerValidationSuccess(result);
          }, function (error) {
            // removing the associated data
            DataFactory.clear(SE_LEG_VIEWS.SCANNER);
            vm.onScannerValidationFailure(error);
          });
      }
    }
  });
})();

