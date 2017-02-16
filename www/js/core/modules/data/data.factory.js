/**
 * Data factory to handle temporal data.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 11 2017
 */
(function () {
  define(['./data.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .factory('DataFactory', DataFactory);
    /* @ngInject */
    function DataFactory($q) {
      var factory = this;

      factory.hasComponentData = hasComponentData;
      factory.clearAll = clearAll;
      factory.clear = clear;
      factory.get = get;
      factory.save = save;

      var data = {};

      /**
       * It checks if requested component data is stored.
       * @param component the data to be checked.
       * @returns {promise}
       */
      function hasComponentData(component) {
        var deferred = $q.defer();

        if (data[component]) {
          deferred.resolve();
        } else {
          deferred.reject();
        }

        return deferred.promise;
      }

      /**
       * It clears all the saved data.
       */
      function clearAll() {
        data = {};
      }

      /**
       * It clears the information associated to a component.
       * @param component to clear its associated data.
       */
      function clear(component) {
        if (component !== undefined && data[component]) {
          data[component] = undefined;
        }
      }

      /**
       * It retrieves the saved information for a given component (or undefined).
       * @param component to get its associate information.
       * @return the saved information.
       */
      function get(component) {
        var componentData = undefined;
        if (component !== undefined && data[component]) {
          componentData = data[component];
        }
        return componentData;
      }

      /**
       * It saves the given data associated to the given component.
       * @param component to associate the information.
       * @param dataToBeSaved to be saved.
       */
      function save(component, dataToBeSaved) {
        if (component !== undefined && dataToBeSaved !== undefined) {
          data[component] = dataToBeSaved;
        }
      }

      return factory;
    }
  });
})();
