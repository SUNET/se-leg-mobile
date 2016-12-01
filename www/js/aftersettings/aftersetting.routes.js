/**
 * After setting routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Thu Dec 1 2016
 */

(function () {
  define(['./aftersetting.module', 'text!./aftersetting.html'], function (module, aftersettingTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('aftersetting', {
        url: '/aftersetting',
        template: aftersettingTemplate,
        controller: 'AftersettingController',
        controllerAs: 'aftersettingCtrl'
      });
    }
  });
})();