/**
 * Access fingerprint scanner functionality of the current platform.
 * @param {type} angular
 * @returns {angular.module}
 * @author Ignacio González <igonzalez@emergya.com>
 */
(function () {
    define([
        'angular'
    ], function (ng) {
        'use strict';

        var moduleName = 'app.core.fingerprintScanner';

        ng.module(moduleName, []);

        return moduleName;

    });
})();
