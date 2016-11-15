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
    function ScannerController($cordovaBarcodeScanner, $ionicPlatform) {

      var vm = this;
      vm.scanResults = '';

      vm.scan = scan;

      /**
       *
       */
      function scan() {

        $ionicPlatform.ready(function () {
          $cordovaBarcodeScanner
            .scan()
            .then(function (result) {
              // Success! Barcode data is here
              vm.scanResults = "We got a barcoden" +
                "Result: " + result.text + "n" +
                "Format: " + result.format + "n" +
                "Cancelled: " + result.cancelled;
            }, function (error) {
              // An error occurred
              vm.scanResults = 'Error: ' + error;
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

