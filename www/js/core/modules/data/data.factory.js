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

      factory.save = save;
      factory.get = get;
      factory.clear = clear;
      factory.clearAll = clearAll;

      var data = {};

      factory.hasQRInformation = hasQRInformation;

      /**
       * It checkts if the QR information is stored.
       * @returns {$q@call;defer.promise}
       */
      function hasQRInformation() {
        var deferred = $q.defer();
        // TODO: IMPLEMENT IT
        deferred.resolve();
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
          component = data[component];
        }
        return componentData;
      }

      /**
       * It saves the given data associated to the given component.
       * @param component to associate the information.
       * @param data to be saved.
       */
      function save(component, data) {
        if (component !== undefined && data !== undefined) {
          data[component] = data;
        }
      }

      return factory;
    }
  });
})();
