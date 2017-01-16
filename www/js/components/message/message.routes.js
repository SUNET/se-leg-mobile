/**
 * Messages routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Wed Nov 16 2016
 */

(function () {
  define(['./message.module', 'text!./message.html'], function (module, messageTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider, SE_LEG_VIEWS) {

      $stateProvider.state(SE_LEG_VIEWS.MESSAGE, {
        url: 'sss/' + SE_LEG_VIEWS.MESSAGE,
        params: {
          errorScreen: false,
          msg: undefined,
          title: undefined,
          buttonOptions: undefined
        },
        template: messageTemplate,
        controller: 'MessageController',
        controllerAs: 'messageCtrl'
      });
    }
  });
})();