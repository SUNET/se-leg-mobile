/**
 * Focus me directive
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 */
(function () {
  define(['./focus-me.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .directive('focusMe', FocusMeDirective);

    /* @ngInject */
    function FocusMeDirective($timeout) {
      return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
          $timeout(function () {
            var tagName = $element[0].tagName;
            if (tagName === 'INPUT' || 'TEXTAREA') {
              cordova.plugins.Keyboard.show();
            }
            $element[0].focus();
          }, 500);
        }
      };
    }
  });
})();
