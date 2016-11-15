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
    function ScannerService($log, $q, CommonService) {

      var service = this;

      service.post = post;

      /**
       *
       * @param {String} barcode token.
       * @returns
       */
      function post(token) {
        var deferred = $q.defer();

        $log.debug('Scanner to: ');
        CommonService
          .call('POST', '', token, 'Error into the application.')
          .then(function (data) {

          })
          .catch(deferred.reject);

        return deferred.promise;
      }

    }
  });

})();