/**
 * Application config constants.
 *
 * @param {type} angular
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */

(function () {
    define(['./constants.module'], function (moduleName) {
        'use strict';

        /**
         * Application basic configurations.
         */
        angular
            .module(moduleName)
            .constant('CORE_CONFIGS', {
                BACKEND_URL: '@@backendUrl',
                CONNECTION_TIMEOUT: '@@connectionTimeout',
                DEFAULT_LANGUAGE: '@@defaultLanguage'
            });

    });

})();

