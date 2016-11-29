/**
 * Permissions factory.
 *
 * @param {type} angular
 * @author Alejandro Gomez <amoron@emergya.com>
 * @author Mercedes Jimenez <mjimenez@emergya.com>
 */
(function () {
    define(['./permissions.module'],
        function (moduleName) {
            'use strict';
            // defining the factory
            angular.module(moduleName).factory('PermissionsHandlerFactory', PermissionsHandlerFactory);

            /* @ngInject */
            function PermissionsHandlerFactory($ionicPopup, $translate, Permissions, PermissionsStrategyFactory) {
                var factory = this;

                factory.grantPermissionsAndPerformAction = grantPermissionsAndPerformAction;

                /**
                 * It provides the permissions (if needed) for the given action (if it was defined in the object provided in the setConfigObject method).
                 * @param {type} JSON with:
                 *  - action: action to be use in the grantPermissions method
                 *  - onSuccess: function to be executed
                 *  - onFailure: function to be executed
                 *  - onFailureMessage: Message to be shown on failure
                 */
                function grantPermissionsAndPerformAction(action) {
                    // template pattern: if the permissionsPerAction are defined and also there is a defined item for the
                    // provided action, we call to the strategy

                    Permissions.grantPermissions(action.action)
                        .then(function (result) {
                            if (action.onSuccess && typeof action.onSuccess === 'function') {
                                action.onSuccess();
                            }
                        })
                        .catch(function (err) {
                            var platform = PermissionsStrategyFactory.getPlatform();
                            if (action.onFailure !== undefined && typeof action.onFailure === 'function') {
                                action.onFailure();
                            } else if (platform === 'IOS') {
                                action.onFailure = function () {};
                            } else if (action.onFailureMessage) {
                               $ionicPopup.alert({
                                    title: $translate.instant('permissions.error'),
                                    template: $translate.instant(action.onFailureMessage)
                                });
                            } else {
                                $ionicPopup.alert({
                                    title: $translate.instant('permissions.error'),
                                    template: $translate.instant('permissions.invalid.generic')
                                });
                            }
                        });
                }

                return factory;
            }

        });
})();
