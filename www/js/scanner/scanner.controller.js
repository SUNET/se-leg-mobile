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
    function ScannerController($cordovaBarcodeScanner) {

      var vm = this;

      vm.scan = scan;

      /**
       *
       */
      function scan() {
        vm.scanResults = '';

        $cordovaBarcodeScanner.scan(
          function (result) {
            // Success! Barcode data is here
            vm.scanResults = "We got a barcode\n" +
              "Result: " + result.text + "\n" +
              "Format: " + result.format + "\n" +
              "Cancelled: " + result.cancelled;
          },
          function (error) {
            // An error occurred
            vm.scanResults = "Scanning failed: " + error;
          },
          {
            "preferFrontCamera": true, // iOS and Android
            "showFlipCameraButton": true, // iOS and Android
            "prompt": "Place a barcode inside the scan area", // supported on Android only
            "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
          }
        );

      }

    }
  });
})();

