/**
 * Identification service
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */


(function () {
  define(['./identification.module'], function (module) {
    'use strict';

    angular.module(module).service('IdentificationService', IdentificationService);

    /* @ngInject */
    function IdentificationService($log, $q, CommonService, SE_LEG_GLOBAL, $state, SE_LEG_VIEWS) {

      var service = this;

      service.post = post;

      return service;

      /**
       *
       * @param {String} barcode token.
       * @returns
       */
      function post(token) {
        var deferred = $q.defer();

        CommonService
          .call(SE_LEG_GLOBAL.METHODS.POST, SE_LEG_GLOBAL.ENDPOINTS.RESULT, token, 'Error into the application.')
          .then(function (data) {
            deferred.resolve(data);
          })
          .catch(deferred.reject);

        return deferred.promise;
      }

    }
  });

})();

