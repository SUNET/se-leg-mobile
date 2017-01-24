/**
 * Fingerprint scanner factory.
 *
 * @param {string} moduleName
 * @author Ignacio González <igonzalez@emergya.com>
 */
(function () {
  define(['./fingerprintScanner.module'],
    function (moduleName) {
      'use strict';

      angular
        .module(moduleName)
        .factory('FingerprintScannerFactory', FingerprintScannerFactory);

      /* @ngInject */
      function FingerprintScannerFactory(FingerprintScannerStrategyFactory) {
        var factory = this;
        var fingerprintScannerFactory;

        factory.isAvailable = isAvailable;
        factory.verifyFingerprint = verifyFingerprint;

        activate();

        function activate() {
          fingerprintScannerFactory = FingerprintScannerStrategyFactory.getFingerprintScannerHandler();
        }

        /**
         * Checks whether the fingerprint scanner is available in the device.
         * @returns {Promise}
         */
        function isAvailable() {
          return fingerprintScannerFactory.isAvailable();
        }

        /**
         * Scans the fingerprint.
         * @returns {Promise}
         */
        function verifyFingerprint() {
          return fingerprintScannerFactory.verifyFingerprint();
        }

        return factory;
      }
    });
})();
