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
    function FingerPrintFactory($q, $state, SE_LEG_GLOBAL, SE_LEG_VIEWS, UtilsFactory, ModalFactory) {
      var factory = this;
      var ready = false;
      // Public methods
      factory.existsFingerprintDevice = existsFingerprintDevice;
      factory.existsFingerprintRegistered = existsFingerprintRegistered;
      factory.checkFingerPrintRegistered = checkFingerPrintRegistered;
      factory.authenticateFingerprint = authenticateFingerprint;
      factory.isReady = isReady;
      return factory;
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
                ready = true;
                deferred.resolve(result);
              } else {
                deferred.reject(result);
              }
            }, function (error) {
              deferred.reject(error);
            });
          } else {
            deferred.reject();
          }
        } else if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
          if (window.plugins && window.plugins.touchid) {
            window.plugins.touchid.isAvailable(
              function (result) {
                var response = {isHardwareDetected: true, isAvailable: false};
                deferred.resolve(response);
              }, // success handler: TouchID available
              function (msg) {
                var response = {isHardwareDetected: false, isAvailable: false};
                deferred.reject(response);
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

      /**
       * It checks the device has registered fingerprint (and the needed hardware).
       * @returns {$q@call;defer.promise}
       */
      function existsFingerprintRegistered() {
        var deferred = $q.defer();
        existsFingerprintDevice()
          .then(function (result) {
            if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.ANDROID) {
              if (!result.isAvailable) {
                deferred.reject(result);
              } else {
                deferred.resolve(result);
              }
            } else if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
              window.plugins.touchid.isAvailable(function () {
                deferred.resolve({isHardwareDetected: true, isAvailable: true});
              }, deferred.reject);
            } else {
              deferred.reject();
            }
          })
          .catch(deferred.reject);
        return deferred.promise;
      }

      /**
       * It checks if there is a fingeprint registered and also shows a conirmation screen (if configured).
       * @param showContinueScreen flag to know if a confirmation screen will be shown or not.
       * @param continueScreenConfig with all the configuration for the nextScreen,
       * @returns {$q@call;defer.promise}
       */
      function checkFingerPrintRegistered(showContinueScreen, continueScreenConfig) {
        var deferred = $q.defer();
        existsFingerprintRegistered()
          .then(function (result) {
            deferred.resolve(result);
            handleFingerprintSuccess(showContinueScreen, continueScreenConfig);
          })
          .catch(function (error) {

            deferred.reject({errorFn: function () {
                ; /* DO NOTHING */
              }
            });
          });
        return deferred.promise;
      }

      function handleFingerprintSuccess(showContinueScreen, continueScreenConfig) {
        ModalFactory.showModal(
          {
            title: 'error.fingerprint.notFIngerprintRegisteredTitle',
            text: 'error.fingerprint.notFIngerprintRegisteredTitle',
            id: SE_LEG_VIEWS.FINGERPRINTVERIFICATION,
            onHideFn: function () {
              if (cordova.plugins && cordova.plugins.settings && typeof cordova.plugins.settings.openSetting
                != undefined) {
                cordova.plugins.settings.openSetting("security", function () {},
                  function () {
                    $state.go(SE_LEG_VIEWS.MESSAGE,
                      {
                        errorScreen: true,
                        title: 'SECURITY TITLE',
                        msg: 'security.error.errorOpenSecurity',
                        buttonOptions: [
                          {
                            text: 'message.close',
                            onClick: function () {
                              UtilsFactory.closeApp();
                            }
                          }]
                      });
                  });
              }
              if (showContinueScreen) {
                if (continueScreenConfig === undefined) {
                  continueScreenConfig = {
                    params: {}
                  };
                }

                if (!continueScreenConfig.state) {
                  continueScreenConfig.state = SE_LEG_VIEWS.MESSAGE;
                }

                if (!continueScreenConfig.params.title) {
                  continueScreenConfig.params.title = 'fingerprintVerification.title';
                }

                if (!continueScreenConfig.params.msg) {
                  continueScreenConfig.params.msg = 'fingerprintVerification.message';
                }

                if (!continueScreenConfig.params.onClick) {
                  continueScreenConfig.params.onClick = function () {
                    $state.go(SE_LEG_VIEWS.SCANNER);
                  };
                }

                if (!continueScreenConfig.params.textButton) {
                  continueScreenConfig.params.textButton = 'fingerprintVerification.continue';
                }


                $state.go(continueScreenConfig.state, {
                  title: continueScreenConfig.params.title,
                  msg: continueScreenConfig.params.message,
                  buttonOptions: [
                    {
                      condition: true,
                      text: continueScreenConfig.params.textButton,
                      onClick: function () {
                        continueScreenConfig.params.onClick();
                      },
                      default: true
                    }
                  ]
                });
              }
            }
          });
      }

      /**
       * It authenticates the user getting his fingerprint.
       * @returns {$q@call;defer.promise}
       */
      function authenticateFingerprint() {
        var deferred = $q.defer();
        if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.ANDROID) {
          // it is available
          var client_id = "Your client ID";
          var client_secret = "A very secret client secret (once per device)";
          FingerprintAuth.show({
            clientId: client_id,
            clientSecret: client_secret
          }, function (result) {
            deferred.resolve(result);
          }, function (error) {
            deferred.reject(error);
          });
        } else if (UtilsFactory.getPlatform() === SE_LEG_GLOBAL.PLATFORMS.IOS) {
          window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback($translate.instant(
            'fingerprintVerification.title'), function (msg) {
            deferred.resolve({withFingerprint: msg});
          }, deferred.reject);

        } else {
          deferred.reject();
        }

        return deferred.promise;
      }

      /**
       * It checks if the factory is ready to be used.
       * @returns {Boolean} true if the factory is ready to be used.
       */
      function isReady() {
        return ready;
      }

    }
  });
})();
