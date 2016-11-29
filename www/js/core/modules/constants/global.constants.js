/**
 * Global constants.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .constant('SE_LEG_GLOBAL', {
        METHODS: {
          POST: 'POST',
          GET: 'GET',
          PUT: 'PUT',
          DELETE: 'DELETE',
          PATCH: 'PATCH'
        },
        LANGUAGE: {
          LOCATION: 'assets/locale/',
          PREFIX: 'lang-',
          SUFFIX: '.json',
          LOCALE_DEFINITIONS_LOCATION: 'assets/locale/i18n'
        },
        ENDPOINTS: {
          RESULT: '/vetting-result'
        }
      });
  });
})();

