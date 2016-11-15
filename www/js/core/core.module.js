/**
 * Main module.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Mon Nov 14 2016
 */
(function () {
  define([
    'angular'// Yeoman hook. Define section. Do not remove this comment.
  ],
    function (angular) {
      'use strict';
      var module = angular.module('app.core', [
        // Yeoman hook. Dependencies section. Do not remove this comment.
        'app.core.modules']);

      module.config(Config);

      Config.$inject = ['$urlRouterProvider'];

      function Config($urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
      }

      return module;
    });
})();
