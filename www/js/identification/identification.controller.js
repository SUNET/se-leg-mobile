/**
 * Identification controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./identification.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('IdentificationController', IdentificationController);
    /* @ngInject */
    function IdentificationController() {

      var vm = this;

    }
  });
})();


