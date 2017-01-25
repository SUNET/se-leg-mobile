/**
 * Scanner controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */

(function () {
  define(['./scanner.module', 'text!./scanner-modal.html'], function (moduleName, modalTemplate) {
    'use strict';
    angular.module(moduleName)
      .controller('ScannerController', ScannerController);
    /* @ngInject */
    function ScannerController($ionicModal, $scope, $state, SE_LEG_VIEWS, ScannerFactory, UtilsFactory, MainFactory,
      DataFactory) {

      var vm = this;

      // by default actions
      vm.onScannerValidationSuccess = function (result) {
        MainFactory.handleNextComponent();
      };
      vm.onScannerValidationFailure = function (error) {
        // error handle
        if (error === 'cancelled') {
          UtilsFactory.closeApp({title: 'fingerprintVerification.error.title',
            text: 'fingerprintVerification.error.text'});
        } else {
          // An error occurred
          $state.go(SE_LEG_VIEWS.MESSAGE,
            {
              errorScreen: true,
              msg: 'scanner.error',
              buttonOptions: [
                {
                  condition: true,
                  default: true,
                  text: 'message.close',
                  onClick: function () {
                    UtilsFactory.closeApp();
                  }
                }
              ]
            }
          );
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
          .then(function (result) {
            scan();
          })
          .catch(function (error) {
            closeApp(true);
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

