/**
 * Scanner module.
 * @param {type} angular
 * @returns {angular.module}
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Mon Nov 14 2016
 */


(function () {

  define([
    'angular'
  ], function (ng) {
    'use strict';

    var moduleName = 'app.scanner';

    ng.module(moduleName, ['ngCordova']);

    return moduleName;
  });
})();


