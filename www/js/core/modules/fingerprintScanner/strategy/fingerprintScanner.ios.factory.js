/**
 * iOS fingerprint scanner factory handler.
 * Uses https://github.com/EddyVerbruggen/cordova-plugin-touch-id
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
        .factory('FingerprintScannerIosFactory', FingerprintScannerIosFactory);

      /* @ngInject */
      function FingerprintScannerIosFactory($q, $translate) {
        var factory = this;

        factory.isAvailable = isAvailable;
        factory.verifyFingerprint = verifyFingerprint;

        /**
         * Checks whether the fingerprint scanner is available in the device.
         * @returns {Promise}
         */
        function isAvailable() {
          var deferred = $q.defer();

          window.plugins.touchid.isAvailable(function () {
            deferred.resolve({ isHardwareDetected: true, isAvailable: true });
          }, deferred.reject);

          return deferred.promise;
        }

        /**
         * Scans the fingerprint.
         * @returns {Promise}
         */
        function verifyFingerprint() {
          var deferred = $q.defer();

          window.plugins.touchid.verifyFingerprint(
            $translate.instant('fingerprintVerification.title'),
            function () {
              deferred.resolve({ withFingerprint: true });
            },
            function () {
              deferred.reject('Cancelled');
            });

          return deferred.promise;
        }

        return factory;
      }
    });
})();
