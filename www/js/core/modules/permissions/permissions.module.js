/**
 * Permissions handler to ask and allow/deny them.
 * @param {type} angular
 * @returns {angular.module}
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define([
        'angular'
    ], function (ng) {
        'use strict';

        var moduleName = 'app.core.permissions';

        ng.module(moduleName, []);

        return moduleName;

    });
})();
