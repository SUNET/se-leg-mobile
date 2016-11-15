/**
 * Constants service
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Mon Nov 14 2016
 */


(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .service('ConstantsService', ConstantsService);

    /* @ngInject */
    function ConstantsService(CORE_CONFIGS, SE_LEG_VIEWS) {
      var service = angular.merge(CORE_CONFIGS, SE_LEG_VIEWS);

      return service;

    }
  });
})();