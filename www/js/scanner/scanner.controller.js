/**
 * Scanner controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./scanner.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('ScannerController', ScannerController);
    /* @ngInject */
    function ScannerController($cordovaBarcodeScanner, $ionicPopup, $scope, $state, $translate,
      PermissionsHandlerFactory, SE_LEG_VIEWS) {

      var vm = this;
      vm.scanData = '';

      vm.scan = scan;

      $scope.$on('$ionicView.enter', scan);

      activate();

      function activate() {
      }

      /**
       * Request camera permission and display the scanner when granted.
       */
      function scan() {

        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);


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
              //console.log("Fingerprint auth available, but no fingerprint registered on the device");
              //$state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notRegistred'});
              if (typeof cordova.plugins.settings.openSetting != undefined)
                cordova.plugins.settings.openSetting("security", function () {
                  console.log(
                    "opened nfc settings")
                },
                  function () {
                    console.log(
                      "failed to open nfc settings")
                  });
              $state.go(SE_LEG_VIEWS.AFTERSETTING);

            } else {
              PermissionsHandlerFactory.grantPermissionsAndPerformAction({
                action: 'CAMERA',
                onSuccess: showBarScanner,
                onFailure: function () {
                  closeApp(true);
                }
              });
            }
          } else {
            $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notFingerprint'});
          }
        }

        function isAvailableError(message) {
          // fingerprint auth isn't available
          //console.log("isAvailableError(): " + message);
          $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'fingerprint.error.notDetectFingerprintDevice'});
        }

        /**
         * Open the scanner.
         */
        function showBarScanner() {
          $cordovaBarcodeScanner
            .scan()
            .then(function (result) {
              // Barcode data is here
              if (result.cancelled) {
                closeApp();
              } else {
                vm.scanData = result.text;
                $state.go(SE_LEG_VIEWS.ID, {scanner: vm.scanData});
              }
            }, function (error) {
              // An error occurred
              vm.scanData = 'Error: ' + error;
              $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'scanner.error'});
            });
        }

        function closeApp(hasError) {
          if (hasError) {
            var modal = $ionicPopup.alert({
              title: $translate.instant('permissions.error'),
              template: $translate.instant('permissions.invalid.camera')
            });
            modal.then(function () {
              navigator.app.exitApp();
            });
          } else {
            navigator.app.exitApp();
          }
        }

      }
    }
  });
})();

