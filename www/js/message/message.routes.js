/**
 * Messages routes.
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 * @since Wed Nov 16 2016
 */

(function () {
  define(['./message.module', 'text!./message.html'], function (module, messageTemplate) {
    'use strict';
    angular.module(module).config(config);

    /* As a angular module config, here it's not possible inject constants services, only providers.*/
    /* @ngInject */
    function config($stateProvider) {

      $stateProvider.state('message', {
        url: '/message',
        template: messageTemplate,
        controller: 'MessageController',
        controllerAs: 'messageCtrl'
      });
    }
  });
})();