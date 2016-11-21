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

        $log.debug('Identification to: ');
        /*CommonService
         .call(SE_LEG_GLOBAL.METHODS.POST, '', token, 'Error into the application.')
         .then(function (data) {
         $state.go(SE_LEG_VIEWS.MESSAGE);
         })
         .catch(deferred.reject);*/

        $state.go(SE_LEG_VIEWS.MESSAGE);

        return deferred.promise;
      }

    }
  });

})();

