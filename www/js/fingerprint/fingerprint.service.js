/**
 * Fingeprint service
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 */


(function () {
  define(['./fingerprint.module'], function (module) {
    'use strict';

    angular.module(module).service('FingerprintService', FingerprintService);

    /* @ngInject */
    function FingerprintService($log, $q, CommonService, SE_LEG_GLOBAL, $state, SE_LEG_VIEWS) {

      var service = this;

      service.sendByPost = sendByPost;

      return service;

      /**
       *
       * @param {String} barcode token.
       * @returns
       */
      function sendByPost(token) {
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

