/**
 * Factory module.
 * @param {type} angular
 * @returns {angular.module}
 * @author María Villalba <mavillalba@emergya.com>
 * @since Tue Nov 22 2016
 */

(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core.factories';

    ng.module(moduleName, []);

    return moduleName;

  });
})();