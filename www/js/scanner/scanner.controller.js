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
    function ScannerController($cordovaBarcodeScanner, $ionicPlatform, $state, SE_LEG_VIEWS) {

      var vm = this;
      vm.scanData = '';

      vm.scan = scan;

      activate();

      function activate() {
        vm.scan();
      }

      /**
       *
       */
      function scan() {
        $ionicPlatform.ready(function () {
          $cordovaBarcodeScanner
            .scan()
            .then(function (result) {
              // Barcode data is here
              vm.scanData = result.text.split(' ')[1].split('"')[1];
              $state.go(SE_LEG_VIEWS.ID, {scanner: vm.scanData});
            }, function (error) {
              // An error occurred
              vm.scanData = 'Error: ' + error;
            }),
            {
              "preferFrontCamera": true, // iOS and Android
              "showFlipCameraButton": true, // iOS and Android
              "prompt": "Place a barcode inside the scan area", // supported on Android only
              "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
            }
          ;
        });
      }
    }
  });
})();

