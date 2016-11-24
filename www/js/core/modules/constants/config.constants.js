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
                BACKEND_URL: 'http://10.35.1.123:444',
                CONNECTION_TIMEOUT: '30000',
                DEFAULT_LANGUAGE: 'en'
            });

    });

})();

