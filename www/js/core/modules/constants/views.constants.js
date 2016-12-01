/**
 * Application view constants.
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
      .constant('SE_LEG_VIEWS', {
        SCANNER: 'scanner',
        MESSAGE: 'message',
        ID: 'identification',
        FINGERPRINT: 'fingerprint',
        AFTERSETTING: 'aftersetting'
      });
  });
})();
