/**
 * Main routes.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 11 2017
 */

(function () {
  define(['./main.module'], function (module) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {

      $stateProvider.state('main', {
        url: '/',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      });

      $urlRouterProvider.otherwise('/');

    }
  });
})();