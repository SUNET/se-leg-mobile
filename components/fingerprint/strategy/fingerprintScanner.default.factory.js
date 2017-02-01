/**
 * Default fingerprint scanner factory handler.
 * Rejects any attempt of using the fingerprint scanner
 *
 * @param {string} moduleName
 * @author Ignacio González <igonzalez@emergya.com>
 */
(function () {
  define(['./../fingerprint.module'],
    function (moduleName) {
      'use strict';

      angular
        .module(moduleName)
        .factory('FingerprintScannerDefaultFactory', FingerprintScannerDefaultFactory);

      /* @ngInject */
      function FingerprintScannerDefaultFactory($q) {
        var factory = this;

        factory.isAvailable = isAvailable;
        factory.verifyFingerprint = verifyFingerprint;

        factory.isAvailable = isAvailable;

        /**
         * Checks whether the fingerprint scanner is available in the device.
         * @returns {Promise} rejected promise.
         */
        function isAvailable() {
          return $q.reject('Not available');
        }

        /**
         * Not available for default devices.
         * @returns {Promise} rejected promise.
         */
        function verifyFingerprint() {
          return $q.reject('Not available');
        }

        return factory;
      }
    });
})();
