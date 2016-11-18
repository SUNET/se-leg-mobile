/**
 * logo routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Fry Nov 18 2016
 */

(function () {
  define(['./logo.module', 'text!./logo.html'], function (module, logoTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider, $urlRouterProvider) {

      $stateProvider.state('logo', {
        url: '/',
        template: logoTemplate
      });

      $urlRouterProvider.otherwise('/');
    }
  });
})();

