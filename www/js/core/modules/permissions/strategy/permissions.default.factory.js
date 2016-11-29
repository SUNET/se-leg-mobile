/**
 * Default permissions factory handler.
 *
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define(['./../permissions.module'],
        function (moduleName) {
            'use strict';
            // defining the factory
            angular.module(moduleName).factory('PermissionsDefaultFactory', PermissionsDefaultFactory);
            /* @ngInject */
            function PermissionsDefaultFactory($q) {
                var factory = this;

                factory.grantPermissions = grantPermissions;

                /**
                 * It provides the permissions (if needed) for the given action (if it was defined in the object provided in the setConfigObject method).
                 * @param {type} permissions with the array to be authorized.
                 * @returns {promise} a promise gotten from the $q service.
                 */
                function grantPermissions(permissions) {
                    var deferred = $q.defer();
                    // by default, we always grant permissions
                    deferred.resolve();

                    return deferred.promise;
                }

                return factory;
            }

        });
})();
