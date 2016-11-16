/**
 * Application config constants.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';

    /**
     * Application basic configurations.
     */
    angular
      .module(moduleName)
      .constant('CORE_CONFIGS', {
        BACKEND_URL: '',
        CONNECTION_TIMEOUT: '30000',
        DEFAULT_LANGUAGE: 'en'
      });

  });

})();

