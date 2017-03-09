/**
 * Focus me directive
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 */
(function () {
  define(['./header.module', 'text!./header.html'], function (moduleName, headerTemplate) {
    'use strict';

    angular
      .module(moduleName)
      .component('seLegHeader', seLegHeader());

    /* @ngInject */
    function seLegHeader() {
      return {
      template: headerTemplate,
      controller: 'SeLegHeaderController',
      controllerAs: 'seLegHeaderCtrl'
    }}

  });
})();
