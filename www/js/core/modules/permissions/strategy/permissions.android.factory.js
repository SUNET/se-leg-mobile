/**
 * Default permissions factory handler.
 * Coupled to the https://github.com/NeoLSN/cordova-plugin-android-permission plugin.
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
            angular.module(moduleName)
                .factory('PermissionsAndroidFactory', PermissionsAndroidFactory);

            /* @ngInject */
            function PermissionsAndroidFactory($q) {
                var factory = this;

                factory.grantPermissions = grantPermissions;

                /**
                 * It provides the permissions (if needed) for the given action (if it was defined in the object provided in the setConfigObject method).
                 * @param {type} permissions with the array to be authorized.
                 * @returns {promise} a promise gotten from the $q service.
                 */
                function grantPermissions(permissions) {
                    var deferred = $q.defer();
                    if (permissions === undefined) {
                        // if there is no permissions to allow, resolving it
                        deferred.resolve;
                    } else {
                        if (permissions.length > 0) {
                            if (isPluginEnabled()) {
                                cordova.plugins.permissions.requestPermissions(permissions, function (result) {
                                    if (result !== undefined && result.hasPermission) {
                                        deferred.resolve();
                                    } else {
                                        deferred.reject();
                                    }
                                }, function (result) {
                                    deferred.reject();
                                });
                            } else {
                                deferred.reject();
                            }
                        } else {
                            // if there is no permissions to allow, resolving it
                            deferred.resolve();
                        }
                    }
                    return deferred.promise;
                }

                /**
                 * It checks if the plugin is enabled to be used.
                 * @returns true if the plugin is enabled.
                 */
                function isPluginEnabled() {
                    return cordova && cordova.plugins && cordova.plugins.permissions;
                }

                return factory;
            }

        });
})();
