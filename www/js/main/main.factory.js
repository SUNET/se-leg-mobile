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

      factory.handleCurrentComponent = handleCurrentComponent;
      factory.goBack = goBack;

      function initializeWorkflow() {
        // TODO: hardcoded, it should come from a JSON file
        appWorkflow = [
          {
            url: SE_LEG_VIEWS.SCANNER
          }
        ];
      }

      function getNextComponent() {
        var component = undefined;
        if (currentComponent < appWorkflow.length - 1) {
          currentComponent++;
          component = appWorkflow[currentComponent];
        }
        return component;
      }

      function goBack() {
        currentComponent--;
      }

      function handleCurrentComponent() {
        var component = getNextComponent()
        if (component !== undefined) {
          $state.go(component.url, component.parameters);
        } else {
          // TODO: SHOULD BE TRANSLATED
          UtilsFactory.closeApp({title: 'MAIN ERROR', text: 'CUSTOMIZED MAIN ERROR'});
        }
      }



      return factory;
    }
  });
})();
