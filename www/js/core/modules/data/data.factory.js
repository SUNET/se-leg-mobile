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

      return factory;
    }
  });
})();
