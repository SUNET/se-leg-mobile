/**
 * Sender service
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 */


(function () {
  define(['./sender.module'], function (module) {
    'use strict';

    angular.module(module).service('SenderService', SenderService);

    /* @ngInject */
    function SenderService($q, CommonService, SE_LEG_GLOBAL) {

      var service = this;

      service.sendByPost = sendByPost;

      return service;

      /**
       *
       * @param data to be sent
       * @returns {$q@call;defer.promise}
       */
      function sendByPost(data) {
        var deferred = $q.defer();

        CommonService
          .call(SE_LEG_GLOBAL.METHODS.POST, SE_LEG_GLOBAL.ENDPOINTS.RESULT, data, 'Error in the application.')
          .then(function (data) {
            deferred.resolve(data);
          })
          .catch(deferred.reject);

        return deferred.promise;
      }

    }
  });

})();

