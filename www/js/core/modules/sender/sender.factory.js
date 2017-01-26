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
    function SenderFactory() {
      var factory = this;

      return factory;

    }
  });
})();
