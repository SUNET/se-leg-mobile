/**
 * Sender component factory.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 12 2017
 */
(function () {
  define(['./sender.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('SenderFactory', SenderFactory);

    /* @ngInject */
    function SenderFactory(SenderService, SenderCustomProcessDataFactory) {
      var factory = this;

      var internalFactory = SenderCustomProcessDataFactory;

      factory.configureFactory = configureFactory;
      factory.send = send;

      /**
       * It sends the information prepared by the internalFactory.
       * @returns {$q@call;defer.promise}
       */
      function send() {
        return SenderService.sendByPost(internalFactory.getProcessedData());
      }

      /**
       * It configures the newFactory as the internal factory to be used.
       * The factory should have a method called getProcessedData and that method should retrieve the data to be sent.
       * @param newFactory to be used.
       * @returns boolean true if the factory was successfully configured false otherwise.
       */
      function configureFactory(newFactory) {
        var configured = false;

        if (newFactory !== undefined
          && typeof newFactory.getProcessedData === 'function') {

          internalFactory = newFactory;
          configured = true;
        }

        return configured;
      }

      return factory;

    }
  });
})();
