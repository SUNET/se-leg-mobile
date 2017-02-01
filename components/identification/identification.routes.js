/**
 * Identification routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Fry Nov 18 2016
 */

(function () {
  define(['./identification.module', 'text!./identification.html'], function (module, identificationTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider, SE_LEG_VIEWS) {

      $stateProvider.state(SE_LEG_VIEWS.ID, {
        url: '/' + SE_LEG_VIEWS.ID,
        // needed to by-pass data to the controller through the $stateProvider
        params: {
          data: {},
          handled: false
        },
        template: identificationTemplate,
        controller: 'IdentificationController',
        controllerAs: 'identificationCtrl'
      });
    }
  });
})();