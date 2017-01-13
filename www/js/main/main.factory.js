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
    function MainFactory($state, UtilsFactory, SE_LEG_VIEWS) {
      var factory = this;
      var appWorkflow = [];
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
        // TODO: hardcoded, it should come from a JSON file
        appWorkflow = [
          {
            url: SE_LEG_VIEWS.SCANNER
          }
        ];
      }

      /**
       * It gets the previous component and sends the user into it.
       * If I am in the first component, the App will be closed.
       */
      function handlePreviousComponent() {
        var component = getPreviousComponent()
        if (component !== undefined) {
          $state.go(component.url, component.parameters);
        } else {
          UtilsFactory.closeApp();
        }
      }

      /**
       * It gets the next component and sends the user into it.
       * If there is no next component, TODO: what happens?
       */
      function handleNextComponent() {
        var component = getNextComponent()
        if (component !== undefined) {
          $state.go(component.url, component.parameters);
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
