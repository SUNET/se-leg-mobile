/**
 * Message component factory.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 12 2017
 */
(function () {
  define(['./message.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .factory('MessageFactory', MessageFactory);

    /* @ngInject */
    function MessageFactory() {
      var factory = this;

      var ready = false;

      factory.isReady = isReady;

      /**
       * It checks if the factory is ready to be used.
       * @returns {Boolean} true if the factory is ready to be used.
       */
      function isReady() {
        return ready;
      }

      return factory;
    }
  });
})();
