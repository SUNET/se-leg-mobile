/**
 * Scanner factory to work with the plugin.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 11 2017
 */

(function () {
  define(['./scanner.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('ScannerFactory', ScannerFactory);

    /* @ngInject */
    function ScannerFactory($q, $cordovaBarcodeScanner, PermissionsHandlerFactory) {
      var factory = this;

      var ready = false;

      factory.scan = scan;
      factory.isReady = isReady;
      factory.allowNeededPermissions = allowNeededPermissions;


      /**
       * It allows all the needed permissions for the plugin.
       * @returns {$q@call;defer.promise}
       */
      function allowNeededPermissions() {
        var deferred = $q.defer();
        PermissionsHandlerFactory.grantPermissionsAndPerformAction({
          action: 'SCANNER',
          onSuccess: function () {
            ready = true;
            deferred.resolve();
          },
          onFailure: function () {
            deferred.reject();
          }
        });
        return deferred.promise;
      }

      /**
       * It opens the scan to get the QR information.
       * @returns {$q@call;defer.promise}
       */
      function scan() {
        var deferred = $q.defer();
        $cordovaBarcodeScanner
          .scan()
          .then(function (result) {
            // Barcode data is here
            if (result.cancelled) {
              deferred.reject('cancelled');
            } else if (!result.text) {
              deferred.reject('errorReading');
            } else {
              deferred.resolve(result);
            }
          }, function (error) {
            // An error occurred
            deferred.reject(error);
          });
        return deferred.promise;
      }

      /**
       * It checks if the factory is ready to be used.
       * @returns {Boolean} true if the factory is ready to be used.
       */
      function isReady() {
        return ready;
      }

      return factory;
    }
  });
})();
