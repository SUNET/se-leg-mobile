/**
 * Default permissions factory handler.
 * Coupled to the https://github.com/akofman/cordova-plugin-permissionScope plugin.
 *
 * @param {type} angular
 * @author Pablo Sobrado <pmsobrado@emergya.com>
 * @author Ignacio González <igonzalez@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define(['./../permissions.module'],
        function (moduleName) {
            'use strict';
            // defining the factory
            angular.module(moduleName)
                .factory('PermissionsIosFactory', PermissionsIosFactory);
            /* @ngInject */
            function PermissionsIosFactory($q) {
                var factory = this;
                factory.grantPermissions = grantPermissions;
                /**
                 * It provides the permissions (if needed) for the given action (if it was defined in the object provided in the setConfigObject method).
                 * @param {type} permissions with the array to be authorized.
                 * @returns {promise} a promise gotten from the $q service.
                 */
                function grantPermissions(permissions) {

                    //TODO @pmsobrado: Fix PermissionScope.init crash to be able to handle languages and investigate callchains

                    // var deferred = $q.defer();

                    if (permissions === undefined) {

                        // if there is no permissions to allow, resolving it
                        return $q.resolve();

                    } else {

                        if (permissions.length > 0) {

                            // var callchain = [];
                            var permissionItem = permissions[0];
                            // permissions.forEach(function (permissionItem) {
                            var deferred = $q.defer();
                            console.log('Requesting permissions for ' + permissionItem.permission);
                            PermissionScope.hasPermission(
                                permissionItem.permission,
                                function () {
                                    deferred.resolve();
                                },
                                function () {
                                    PermissionScope[permissionItem.requestMethod]();
                                    deferred.reject();
                                });
                            // callchain.push(deferred);
                            //});


                            //return $q.all(callchain);
                            return deferred.promise;

                        } else {

                            return $q.resolve();

                        }
                    }
                }

                /**
                 * It checks if the plugin is enabled to be used.
                 * @returns true if the plugin is enabled.
                 */
                function isPluginEnabled() {
                    return typeof PermissionScope !== 'undefined';
                }

                return factory;
            }

        });
})();
