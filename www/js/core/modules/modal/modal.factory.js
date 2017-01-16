/**
 * Message component factory.
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @since Jan 12 2017
 */
(function () {
  define(['./modal.module', 'text!./modal.html'], function (moduleName, modalTemplate) {
    'use strict';

    angular
      .module(moduleName)
      .factory('ModalFactory', ModalFactory);

    /* @ngInject */
    function ModalFactory($rootScope, $ionicModal) {
      var factory = this;

      var defaultConfig = {
        id: 'modal',
        animation: 'slide-in-up'
      };

      factory.showModal = showModal;

      return factory;

      /**
       * Method to show a modal dialog.
       * @param {type} config JSON with the parameters:
       *  {
       *    animation: ionicModal animation,
       *    id: id associated to the modal,
       *    onHideFn: if a custom action will be done after hidden the modal
       *  }
       */
      function showModal(config) {
        if (!config.animation) {
          config.animation = defaultConfig.animation;
        }
        if (!config.id) {
          config.id = defaultConfig.id;
        }

        // TODO: CUSTOMIZE THE TEXT?
        $rootScope[config.id] = $ionicModal.fromTemplate(modalTemplate, {
          scope: $rootScope,
          animation: config.animation
        });
        $rootScope[config.id].show();
        // if some onHideFn was defined, we have to register it
        if (config.onHideFn) {
          // Execute action on hide modal
          $rootScope.$on(config.id + '.hidden', config.onHideFn);
        }
      }

    }
  });
})();
