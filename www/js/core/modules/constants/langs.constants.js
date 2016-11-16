/**
 * Langs constants.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';
    /**
     * Application views constants.
     * Here all views state constants.
     */
    angular
      .module(moduleName)
      .constant('SE_LEG_LANGS', {
        EN: 'en',
        ES: 'es',
        LOCATION: 'js/core/modules/langs/translations/',
        PREFIX: 'lang-',
        SUFFIX: '.json'
      });
  });
})();
