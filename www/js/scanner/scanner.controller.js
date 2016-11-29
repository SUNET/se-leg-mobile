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
    function ScannerController($cordovaBarcodeScanner, $scope, $state, PermissionsHandlerFactory, SE_LEG_VIEWS) {

      var vm = this;
      vm.scanData = '';

      vm.scan = scan;

      $scope.$on('$ionicView.enter', scan);

      activate();

      function activate() {
        vm.scan();
      }

      /**
       * Request camera permission and display the scanner when granted.
       */
      function scan() {

        PermissionsHandlerFactory.grantPermissionsAndPerformAction({
          action: 'CAMERA',
          onSuccess: showBarScanner,
          onFailureMessage: 'permissions.invalid.camera'
        });

        /**
         * Open the scanner.
         */
        function showBarScanner() {
          $cordovaBarcodeScanner
              .scan()
              .then(function (result) {
                // Barcode data is here
                if (result.cancelled) {
                  navigator.app.exitApp();
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

      }
    }
  });
})();

