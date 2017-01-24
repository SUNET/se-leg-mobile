/**
 * Android fingerprint scanner factory handler.
 * Coupled to the https://github.com/ModusCreateOrg/cordova-plugin-android-fingerprint-auth plugin.
 *
 * @param {string} moduleName
 * @author Ignacio González <igonzalez@emergya.com>
 */
(function () {
  define(['./../fingerprintScanner.module'],
    function (moduleName) {
      'use strict';

      angular
        .module(moduleName)
        .factory('FingerprintScannerAndroidFactory', FingerprintScannerAndroidFactory);
      /* @ngInject */
      function FingerprintScannerAndroidFactory($q) {
        var factory = this;

        factory.isAvailable = isAvailable;
        factory.verifyFingerprint = verifyFingerprint;

        /**
         * Checks whether the fingerprint scanner is available in the device.
         * @returns {Promise}
         */
        function isAvailable() {
          var deferred = $q.defer();

          FingerprintAuth.isAvailable(deferred.resolve, deferred.reject);

          return deferred.promise;
        }

        /**
         * Scans the fingerprint.
         * @returns {Promise}
         */
        function verifyFingerprint() {
          var deferred = $q.defer();

          var options = {
            clientId: 'Your client ID',
            clientSecret: 'A very secret client secret (once per device)'
          };

          FingerprintAuth.show(options, function (result) {
            if (typeof result === 'object') {
              deferred.resolve(result);
            }
          }, deferred.reject);

          return deferred.promise;
        }

        return factory;
      }

    });
})();
