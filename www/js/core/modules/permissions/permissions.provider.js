/**
 * Facade pattern
 *
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Ignacio Gonzalez <igonzalez@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define(['./permissions.module'],
        function (moduleName) {
            'use strict';
            // defining the provider
            angular
                .module(moduleName)
                .provider('Permissions', Permissions);

            /* @ngInject */
            function Permissions() {
                var provider = this;

                // Internal injections
                var _$q;
                var _PermissionsStrategyFactory;

                var permissionsPerAction = undefined;
                var actionNames = {};

                this.setConfigObject = setConfigObject;

                /**
                 * Method to set the configuration (permissions).
                 * @param {type} config object with the permissions conf.
                 */
                function setConfigObject(config) {
                    permissionsPerAction = config;
                    actionNames = {};
                    angular.forEach(permissionsPerAction, function (value, key) {
                        actionNames[key] = key;
                    });
                }

                /**
                 * Using the AngularJS way to expose methods.
                 */
                /* @ngInject */
                this.$get = function ($q, PermissionsStrategyFactory) {

                    // Provider injections
                    _$q = $q;
                    _PermissionsStrategyFactory = PermissionsStrategyFactory;

                    return {
                        grantPermissions: grantPermissions,
                        getAvailableActions: getAvailableActions
                    };
                };

                /**
                 * It provides the permissions (if needed) for the given action (if it was defined in the object provided in the setConfigObject method).
                 * @param {type} action which needs permissions to be granted.
                 * @returns {promise} a promise gotten from the $q service.
                 */
                function grantPermissions(action) {
                    // template pattern: if the permissionsPerAction are defined and also there is a defined item for the
                    // provided action, we call to the strategy
                    var deferred = _$q.defer();
                    // Checking if the permissions were set
                    if (permissionsPerAction === undefined || action === undefined) {
                        deferred.reject(
                            'It is not possible to grant permissions. Please configure the permissions in the module before using it.');
                    } else if (permissionsPerAction[action] === undefined) {
                        deferred.reject(
                            'It is not possible to grant permissions. Please configure the permissions for the action [' + action
                            + '] in the module before using it.');
                    } else {
                        var platform = _PermissionsStrategyFactory.getPlatform();
                        // Getting the permissions handler strategy
                        var permissionsHandler = _PermissionsStrategyFactory.getPermissionsHandler(platform);
                        // granting the permissions for the given action
                        permissionsHandler.grantPermissions(permissionsPerAction[action][platform])
                            .then(function (result) {
                                deferred.resolve();
                            })
                            .catch(function (error) {
                                deferred.reject();
                            });
                    }
                    return deferred.promise;
                }



                /**
                 * It returns the available actions.
                 * @returns JSON with the available actions.
                 */
                function getAvailableActions() {
                    return actionNames;
                }
            }
        });
})();
