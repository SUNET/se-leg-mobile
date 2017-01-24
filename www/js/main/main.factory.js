/**
 * Main factory to handle all the main app staff.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 11 2017
 */
(function () {
  define(['./main.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .factory('MainFactory', MainFactory);
    /* @ngInject */
    function MainFactory($state, $q, UtilsFactory, SE_LEG_VIEWS, FingerPrintFactory, ScannerFactory, MessageFactory,
      DataFactory, ModalFactory) {
      var factory = this;
      // internal variables
      var appWorkflow = [];
      var usedModules = {};
      var currentComponent = -1;
      initializeWorkflow();
      factory.handleNextComponent = handleNextComponent;
      factory.handlePreviousComponent = handlePreviousComponent;
      ////////////////////
      // Public methods //
      ////////////////////

      /**
       * It inializes the app configured workflow.
       */
      function initializeWorkflow() {
        loadWorkflow();
        // once the workflow is loaded, we have to initialize it
        for (var index in appWorkflow) {
          appWorkflow[index].processed = false;
          if (typeof appWorkflow[index].backAllowed === undefined) {
            // by default the back is allowed
            appWorkflow[index].backAllowed = true;
          }
          // getting the module name we are using
          if (!usedModules[appWorkflow[index].url]) {
            usedModules[appWorkflow[index].url] = appWorkflow[index].factory;
          }
        }
      }

      /**
       * It loads the wofklow in the appWorkflow attribute.
       */
      function loadWorkflow() {
        /* @worfklow */
        // TODO: hardcoded, it should come from a JSON file?
        appWorkflow = [
          {
            // first view
            state: SE_LEG_VIEWS.SCANNER,
            preconditions: function () {
              var deferred = $q.defer();
              // checking the fingerprint and sending to the confirmation screen
              FingerPrintFactory.checkFingerPrintRegistered(false)
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
                MainFactory.handleNextComponent();
              }
            },
            factory: ScannerFactory
          },
          {
            // second view
            state: SE_LEG_VIEWS.ID,
            preconditions: function () {
              var deferred = $q.defer();
              DataFactory.hasQRInformation()
                .then(function (result) {
                  deferred.resolve(result);
                })
                .catch(function (error) {
                  deferred.reject(error);
                });
              return deferred.promise;
            },
            backAllowed: false,
            onErrorFn: function () {
              // If this is executed, the application was hacked
              UtilsFactory.closeApp();
            }//,
            //factory: IDfactory
          },
          {
            // third view: FINGERPRINT
            state: SE_LEG_VIEWS.FINGEPRINT,
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
                        onClick: goToComponent(0),
                        default: true
                      }
                    ]
                  },
                  backAllowed: false
                };
                // sending the user to the component
                goToComponent(component);
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
              factory: FingerPrintFactory
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
                  != undefined) {
                  cordova.plugins.settings.openSetting("security", function () {},
                    function () {
                      $state.go(SE_LEG_VIEWS.MESSAGE,
                        {
                          errorScreen: true,
                          title: 'message.title',
                          msg: 'security.error.errorOpenSecurity',
                          buttonOptions: [
                            {
                              text: 'message.start',
                              onClick: function () {
                                goToPosition(0);
                              }
                            }]
                        });
                    });
                }
              }
            });
        }
      }

      /**
       * It gets the previous component and sends the user into it.
       * If I am in the first component, the App will be closed.
       */
      function handlePreviousComponent() {
        var component = getPreviousComponent();
        if (component !== undefined) {
          if (!component.backAllowed) {
            UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'BACK NOT ALLOWED'});
          } else {
            if (component.preconditions) {
              component.preconditions()
                .then(function () {
                  currentComponent--;
                  goToComponent(component);
                })
                .catch(function (error) {
                  if (component.onErrorFn) {
                    component.onErrorFn(error);
                  } else {
                    UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
                  }
                });
            } else {
              currentComponent--;
              goToComponent(component);
            }
          }
        } else {
          UtilsFactory.closeApp();
        }
      }

      /**
       * It gets the next component and sends the user into it.
       * If there is no next component, TODO: what happens?
       */
      function handleNextComponent() {
        var component = getNextComponent();
        if (component !== undefined) {
          if (component.preconditions) {
            component.preconditions()
              .then(function () {
                currentComponent++;
                goToComponent(component);
              })
              .catch(function (error) {
                if (component.onErrorFn) {
                  component.onErrorFn(error);
                } else {
                  UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
                }
              });
          } else {
            currentComponent++;
            goToComponent(component);
          }
        } else {
          // TODO: SHOULD BE TRANSLATED
          UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
        }
      }


      //////////////////////
      // Private methods //
      //////////////////////

      /**
       * It retrieves the next component (if there is a new component).
       * @returns JSON with a component information or undefined.
       */
      function getNextComponent() {
        var component = undefined;
        if (currentComponent < appWorkflow.length - 1) {
          component = appWorkflow[currentComponent + 1];
        }
        return component;
      }

      /**
       * It retrieves the next component (if there is a new component).
       * @returns JSON with a component information or undefined.
       */
      function getPreviousComponent() {
        var component = undefined;
        if (currentComponent - 1 >= 0) {
          component = appWorkflow[currentComponent - 1];
        }
        return component;
      }

      /**
       * It goes to the component with the position required.
       * It avoids the PRECONDITIONS.
       * @param position to get the component.
       */
      function goToPosition(position) {
        if (position >= 0 && position <= appWorkflow.length) {
          currentComponent = position - 1;
          handleNextComponent();
        }
      }

      /**
       * It goes to the provides component.
       * @param component where we want to navigate.
       */
      function goToComponent(component) {
        if (component !== undefined && component.state) {
          if (component.params) {
            $state.go(component.state, {data: component.params});
          } else {
            $state.go(component.state, {data: {}});
          }
        }
      }

      return factory;
    }
  });
})();
