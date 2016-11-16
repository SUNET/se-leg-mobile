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
        }
      });
  });
})();

