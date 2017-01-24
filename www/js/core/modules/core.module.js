/**
 * Core module AngularJS configuration.
 * @param {type} angular
 * @returns {angular.module}
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Mon Nov 14 2016
 */

(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core.modules';

    ng.module(moduleName, [
      'app.core.constants',
      'app.core.langs',
      'app.core.permissions',
      'app.core.fingerprintScanner'
    ]);

    return moduleName;
  });
})();