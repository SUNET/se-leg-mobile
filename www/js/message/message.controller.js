/**
 * Message controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./message.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('MessageController', MessageController);
    /* @ngInject */
    function MessageController($state, SE_LEG_VIEWS, $translate) {

      var vm = this;

      vm.errorScreen = $state.params.errorScreen;
      vm.msg = 'message.message';
      vm.title = 'message.title';

      activate();

      function activate() {
        if (vm.errorScreen) {
          vm.msg = $state.params.msg;
          vm.title = 'back.title';
        }
      }

      // Public methods
      vm.start = start;

      /**
       * Start a new vet
       */
      function start() {
        $state.go(SE_LEG_VIEWS.SCANNER);
      }

    }
  });
})();


