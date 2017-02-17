/**
 * Scanner controller
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./main.module'], function (moduleName) {
    'use strict';
    angular
      .module(moduleName)
      .controller('MainController', MainController);

    /* @ngInject */
    function MainController($scope, $state, MainFactory, UtilsFactory) {

      var vm = this;


      $scope.$on('$ionicView.enter', onEnter);

      activate();

      function activate() {
        MainFactory.handleNextComponent();
      }

      /**
       * Method to be executed once the user accesses to the scanner component.
       */
      function onEnter() {
        ;
      }

    }
  });
})();

