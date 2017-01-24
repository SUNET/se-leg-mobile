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
    function ScannerController($ionicModal, $scope, $state, $translate,
      SE_LEG_VIEWS, ScannerFactory, UtilsFactory, MainFactory) {

      var vm = this;
      vm.scanData = '';
      // by default actions
      var onScannerValidationSuccess = function (result) {
        MainFactory.handleNextComponent();
      };
      var onScannerValidationFailure = function (error) {
        UtilsFactory.closeApp({title: 'fingerprintVerification.error.title', text: 'fingerprintVerification.error.text'
        });
      };
      $scope.$on('$ionicView.enter', onEnter);

      activate();

      function activate() {
        // TODO: THIS SHOULD BE MOVED TO THE FINGERPRINT MOdULE Execute action on hide modal
        $scope.$on('modal.hidden', function () {
          if (typeof cordova.plugins.settings.openSetting != undefined) {
            cordova.plugins.settings.openSetting("security", function () {
            },
              function () {
                $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'security.error.errorOpenSecurity'});
              });
          }
          $state.go(SE_LEG_VIEWS.FINGERPRINTVERIFICATION);
        });
      }

      /**
       * Method to be executed once the user accesses to the scanner component.
       */
      function onEnter() {
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
            // Barcode data is here
            vm.scanData = result.text;
            $state.go(SE_LEG_VIEWS.ID, {scanner: vm.scanData});
          }, function (error) {
            if (error === 'cancelled') {
              closeApp(true);
            } else {
              // An error occurred
              vm.scanData = 'Error: ' + error;
              $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'scanner.error'});
            }
          });
      }

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
            $scope.modal = $ionicModal.fromTemplate(modalTemplate, {
              scope: $scope,
              animation: 'slide-in-up'
            });

            $scope.modal.show();
          } else {

//            PermissionsHandlerFactory.grantPermissionsAndPerformAction({
//              action: 'CAMERA',
//              onSuccess: showBarScanner,
//              onFailure: function () {
//                closeApp(true);
//              }
//            });
          }
        } else {
          $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notFingerprint'});
        }
      }

      function isAvailableError(message) {
        // fingerprint auth isn't available
        $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notDetectFingerprintDevice'});
      }

      function onCancel() {
        closeApp(true);
      }

      /**
       * It closes the app.
       * @param hasError boolean to know if the app should be closed with/without errors.
       */
      function closeApp(hasError) {
        var error = undefined;
        if (hasError) {
          error = {title: 'permissions.error', text: 'permissions.invalid.camera'};
        }
        UtilsFactory.closeApp(error);
      }




    }
  });
})();

