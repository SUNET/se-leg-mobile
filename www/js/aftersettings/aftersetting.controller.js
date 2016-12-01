/**
 * After setting controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./aftersetting.module'], function (moduleName) {
    'use strict';
    angular.module(moduleName)
      .controller('AftersettingController', AftersettingController);
    /* @ngInject */
    function AftersettingController($state, SE_LEG_VIEWS, $translate) {

      var vm = this;

      vm.msg = 'message.message';
      vm.title = 'message.title';

      activate();

      function activate() {
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


