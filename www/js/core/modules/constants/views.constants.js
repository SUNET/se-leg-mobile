/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Application view constants.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./constants.module'], function (moduleName) {
    'use strict';
    /**
     * Application views constants.
     * Here all views state constants.
     */
    angular
      .module(moduleName)
      .constant('SE_LEG_VIEWS', {
        SCANNER: 'scanner',
      });
  });
})();
