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
    function SenderCustomProcessDataFactory(/* @@dependencies-placeholder */) {
      var factory = this;

      factory.getProcessedData = getProcessedData;

      /**
       * Injected method from gulp.
       * @returns the processed data.
       */
      /* @@get-custom-processed-data-placeholder */

      return factory;
    }
  });
})();
