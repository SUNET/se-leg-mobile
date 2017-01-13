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
      ModalFactory) {
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
        // TODO: hardcoded, it should come from a JSON file?
        appWorkflow = [
          {
            url: SE_LEG_VIEWS.MESSAGE,
            params: {
              title: 'message.title',
              msg: 'message.description',
              buttonOptions: [
                {
                  condition: FingerPrintFactory.isReady,
                  text: 'message.close',
                  onClick: function () {
                    UtilsFactory.closeApp();
                  }
                },
                {
                  condition: true,
                  text: 'message.start',
                  onClick: handleNextComponent
                }
              ]
            },
            factory: MessageFactory
          },
          {// QR-SCANNER
            url: SE_LEG_VIEWS.SCANNER,
            preconditions: function () {
              var deferred = $q.defer();
              // checking the fingerprint and sending to the confirmation screen
              FingerPrintFactory.checkFingerPrintRegistered(true)
                .then(function (result) {
                  deferred.resolve(result);
                })
                .catch(function (error) {
                  deferred.reject(error);
                });
              return deferred.promise;
            },
            backAllowed: false,
            factory: ScannerFactory
          }
        ];
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
                  $state.go(component.url, component.params);
                })
                .catch(function (error) {
                  if (error && error.errorFn) {
                    error.errorFn();
                  } else {
                    UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
                  }
                });
            } else {
              $state.go(component.url, component.params);
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
                $state.go(component.url, component.params);
              })
              .catch(function (error) {
                if (error.errorFn) {
                  error.errorFn();
                } else {
                  UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
                }
              });
          } else {
            $state.go(component.url, component.params);
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
          currentComponent++;
          component = appWorkflow[currentComponent];
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
          currentComponent--;
          component = appWorkflow[currentComponent];
        }
        return component;
      }

      return factory;
    }
  });
})();
