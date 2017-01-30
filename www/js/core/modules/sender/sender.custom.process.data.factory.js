/**
 * Sender component custom factory (generated from Gulp).
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 27 2017
 */
(function () {
  define(['./sender.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('SenderCustomProcessDataFactory', SenderCustomProcessDataFactory);

    /* @ngInject */
    function SenderCustomProcessDataFactory(UtilsFactory, DataFactory, SE_LEG_VIEWS) {
      var factory = this;

      factory.getProcessedData = getProcessedData;

      /** @@get-custom-processed-data-placeholder */

      return factory;

    }
  });
})();
