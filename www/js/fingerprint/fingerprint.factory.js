/**
 * Fingerprint factory to work with the plugins.
 * For Android: https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth
 * For iOS: https://github.com/EddyVerbruggen/cordova-plugin-touch-id
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 11 2017
 */

(function () {
  define(['./fingerprint.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('FingerPrintFactory', FingerPrintFactory);

    /* @ngInject */
    function FingerPrintFactory($q, SE_LEG_GLOBAL, UtilsFactory, MainFactory) {
      var factory = this;

      factory.existsFingerprintDevice = existsFingerprintDevice;

      /**
       * It checks the device has the needed hardware.
       * @returns {$q@call;defer.promise}
       */
      function existsFingerprintDevice() {
        var deferred = $q.defer();
        if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.ANDROID) {
          if (FingerprintAuth) {
            FingerprintAuth.isAvailable(function (result) {
              if (result.isHardwareDetected) {
                deferred.resolve();
              } else {
                deferred.reject();
              }
            }, function (error) {
              deferred.reject();
            });
          } else {
            deferred.reject();
          }
        } else if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
          if (window.plugins && window.plugins.touchid) {
            window.plugins.touchid.isAvailable(
              function () {
                deferred.resolve();
              }, // success handler: TouchID available
              function (msg) {
                deferred.reject();
              } // error handler: no TouchID available
            );
          } else {
            deferred.reject();
          }
        } else {
          deferred.reject();
        }
        return deferred.promise;
      }

      return factory;
    }
  });
})();
