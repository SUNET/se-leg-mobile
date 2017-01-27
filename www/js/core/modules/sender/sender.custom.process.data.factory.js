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
    function SenderCustomProcessDataFactory(UtilsFactory, DataFactory) {
      var factory = this;

      factory.getProcessedData = getProcessedData;

      /**
       * It retrieves the processed data to be sent.
       * @return the processed data.
       */
      function getProcessedData() {
        return UtilsFactory.jsonToQueryString(DataFactory.getAll());
      }

      return factory;

    }
  });
})();
