module.exports.dependencies = ['$q', '$ionicLoading', 'SE_LEG_VIEWS', 'FingerprintFactory', 'ScannerFactory',
  'MessageFactory', 'DataFactory', 'ModalFactory', 'SenderFactory'];

module.exports.loadWorkflow = loadWorkflow;

function loadWorkflow() {

  appWorkflow = [
    {
      // first view
      state: SE_LEG_VIEWS.SCANNER,
      preconditions: function () {
        var deferred = $q.defer();
        // checking the fingerprint and sending to the confirmation screen
        FingerprintFactory.checkFingerPrintRegistered(false)
          .then(function (result) {
            deferred.resolve(result);
          })
          .catch(function (error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },
      backAllowed: false,
      onErrorFn: function (error) {
        if (error.isHardwareDetected && !error.isAvailable) {
          showScannerErrorModalIfNoFingerprintDetected(error);
        } else {
          // defining the next component
          var component = {
            state: SE_LEG_VIEWS.MESSAGE,
            params: {
              title: 'message.title',
              errorScreen: true,
              msg: 'security.error.errorOpenSecurity',
              buttonOptions: [
                {
                  condition: true,
                  text: 'message.start',
                  onClick: function () {
                    goToPosition(0);
                  },
                  default: true
                }
              ]
            },
            backAllowed: false
          };
          // sending the user to the component
          goToComponent(component);
        }
      },
      params: {
        onScannerValidationSuccess: function (result) {
          handleNextComponent();
        }
      },
      factory: ScannerFactory
    },
    {
      // second view
      state: SE_LEG_VIEWS.ID,
      preconditions: function () {
        var deferred = $q.defer();

        DataFactory.hasComponentData(SE_LEG_VIEWS.SCANNER)
          .then(deferred.resolve)
          .catch(deferred.reject);

        return deferred.promise;
      },
      backAllowed: false,
      onErrorFn: function () {
        // If this is executed, the application was hacked
        UtilsFactory.closeApp();
      }
    },
    {
      // third view: FINGERPRINT
      state: SE_LEG_VIEWS.FINGERPRINT,
      params: {
        // once the fingerprint is validated.
        onFingerprintValidationSuccess: function () {
          // defining the next component
          var component = {
            state: SE_LEG_VIEWS.MESSAGE,
            params: {
              title: 'message.title',
              msg: 'message.message',
              buttonOptions: [
                {
                  condition: true,
                  text: 'message.start',
                  onClick: function () {
                    goToPosition(0);
                  },
                  default: true
                }
              ]
            },
            backAllowed: false
          };
          // sending the data
          $ionicLoading.show();
          SenderFactory.send()
            .then(function (data) {
              // sending the user to the component
              goToComponent(component);
            })
            .catch(function (err) {
              component.params.errorScreen = true;
              component.params.msg = 'fingerprintVerification.error.message';
              component.params.title = 'fingerprintVerification.error.title';
              // sending the user to the component
              goToComponent(component);
            })
            .finally($ionicLoading.hide);
        },
        // if the fingeprint validation failed or it was cancelled.
        onFingerprintValidationFailure: function (error) {
          // on error, sending to the
          var messageError = 'fingerprint.error.notAvailable';
          // if it was cancelled, the message will change
          if (error === "Cancelled") {
            messageError = 'fingerprint.error.cancelled';
          }
          // defining the next component
          var component = {
            state: SE_LEG_VIEWS.MESSAGE,
            params: {
              title: 'back.title',
              msg: messageError,
              errorSreen: true,
              buttonOptions: [
                {
                  condition: true,
                  default: true,
                  text: 'message.close',
                  onClick: function () {
                    UtilsFactory.closeApp();
                  }
                }
              ]
            },
            factory: MessageFactory
          };
          // sending the user to the component
          goToComponent(component);
        },
        factory: FingerprintFactory
      }
    }
  ];
  /**
   * Function to handle the error in the scanner if there is no fingerprint registered.
   * @param error detected.
   */
  function showScannerErrorModalIfNoFingerprintDetected(error) {
    ModalFactory.showModal(
      {
        title: 'fingerprint.error.notFingerprintRegisteredTitle',
        text: 'fingerprint.error.notFingerprintRegisteredTitle',
        id: SE_LEG_VIEWS.FINGERPRINT,
        onHideFn: function () {
          if (cordova.plugins && cordova.plugins.settings && typeof cordova.plugins.settings.openSetting
            != 'undefined') {
            cordova.plugins.settings.openSetting("security", function () {
              },
              function () {
                $state.go(SE_LEG_VIEWS.MESSAGE,
                  {
                    data: {
                      errorScreen: true,
                      title: 'message.title',
                      msg: 'security.error.errorOpenSecurity',
                      buttonOptions: [
                        {
                          text: 'message.start',
                          onClick: function () {
                            goToPosition(0);
                          }
                        }
                      ]
                    }
                  });
              });
          }
        }
      });
  }
}
