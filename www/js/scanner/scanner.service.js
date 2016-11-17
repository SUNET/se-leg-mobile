/**
 * Scanner service
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */


(function () {
  define(['./scanner.module'], function (module) {
    'use strict';

    angular.module(module).service('ScannerService', ScannerService);

    /* @ngInject */
    function ScannerService($log, $q, CommonService, SE_LEG_GLOBAL, $state, SE_LEG_VIEWS) {

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

        $log.debug('Scanner to: ');
        CommonService
          .call(SE_LEG_GLOBAL.METHODS.POST, '', token, 'Error into the application.')
          .then(function (data) {
            $state.go(SE_LEG_VIEWS.MESSAGE);
          })
          .catch(deferred.reject);

        return deferred.promise;
      }

    }
  });

})();