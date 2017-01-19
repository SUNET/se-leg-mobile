/**
 * Scanner controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./scanner.module', 'text!./scanner-modal.html'], function (moduleName, modalTemplate) {
    'use strict';
    angular.module(moduleName)
      .controller('ScannerController', ScannerController);
    /* @ngInject */
    function ScannerController($cordovaBarcodeScanner, $ionicPopup, $ionicModal, $scope, $state, $translate,
      PermissionsHandlerFactory, SE_LEG_VIEWS) {

      var vm = this;
      vm.scanData = '';
      vm.modalMessage = "modal.message";
      vm.modalTitleText = "modal.title";

      vm.scan = scan;

      $scope.$on('$ionicView.enter', scan);

      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        if (typeof cordova.plugins.settings.openSetting != undefined)
          cordova.plugins.settings.openSetting("security", function () {
          },
            function () {
              $state.go(SE_LEG_VIEWS.MESSAGE, {errorScreen: true, msg: 'security.error.errorOpenSecurity'});
            });
        $state.go(SE_LEG_VIEWS.FINGERPRINTVERIFICATION);
      });

      activate();

      function activate() {

      }

      /**
       * Request camera permission and display the scanner when granted.
       */
      function scan() {
        FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
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

      /**
       * Close App.
       */
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
  });
})();

