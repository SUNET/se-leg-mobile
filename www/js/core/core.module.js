/**
 * Main module.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Mon Nov 14 2016
 */
(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.core';

    ng.module(moduleName,
      [
        'app.core.modules',
        'app.core.factories'
      ]);

    return moduleName;
  });
})();





