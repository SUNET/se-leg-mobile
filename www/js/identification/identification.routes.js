/**
 * Identification routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Fry Nov 18 2016
 */

(function () {
  define(['./identification.module', 'text!./identification.html'], function (module, identificationTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('identification', {
        url: '/identification',
        template: identificationTemplate,
        controller: 'IdentificationController',
        controllerAs: 'identificationCtrl'
      });
    }
  });
})();