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
    function DataFactory() {
      var factory = this;



      return factory;
    }
  });
})();
