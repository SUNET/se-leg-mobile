/**
 * Single factory pattern to get the instance of a needed fingerprint scanner handler.
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
        .factory('FingerprintScannerStrategyFactory', FingerprintScannerStrategyFactory);

      /* @ngInject */
      function FingerprintScannerStrategyFactory(FingerprintScannerAndroidFactory, FingerprintScannerDefaultFactory, FingerprintScannerIosFactory) {
        var factory = this;

        var PLATFORMS = {
          UNKNOWN: "UNKNOWN",
          ANDROID: "ANDROID",
          IOS: "IOS",
          WINDOWS: "WINDOWS"
        };

        factory.getFingerprintScannerHandler = getFingerprintScannerHandler;

        /**
         * It retrieves a fingerprint scanner handler depending on the platform.
         * @returns {factory} the suitable factory for the current platform
         */
        function getFingerprintScannerHandler() {
          var platform = getPlatform();
          var handler = FingerprintScannerDefaultFactory;
          switch (platform) {
            case PLATFORMS.ANDROID:
              handler = FingerprintScannerAndroidFactory;
              break;
            case PLATFORMS.IOS:
              handler = FingerprintScannerIosFactory;
              break;
            case PLATFORMS.UNKNOWN:
              handler = FingerprintScannerDefaultFactory;
              break;
            default:
              handler = FingerprintScannerDefaultFactory;
              break;
          }
          return handler;
        }

        /**
         * Method to retrieve the PLATFORM in runtime mode.
         * @returns {string}
         */
        function getPlatform() {
          var platform = PLATFORMS.UNKNOWN;
          // if it's ionic stack
          if (ionic && ionic.Platform) {
            if (ionic.Platform.isAndroid()) {
              platform = PLATFORMS.ANDROID;
            } else if (ionic.Platform.isIOS()) {
              platform = PLATFORMS.IOS;
            }
          } else if (cordova && cordova.platform) {
            // if the platform couldn't be resolved previously (not Ionic
            var cordovaPlatform = device.platform.toUpperCase();
            if (cordovaPlatform === PLATFORMS.ANDROID) {
              platform = PLATFORMS.ANDROID;
            } else if (cordovaPlatform === PLATFORMS.IOS) {
              platform = PLATFORMS.IOS;
            }
          }
          return platform;
        }

        return factory;
      }

    });
})();
