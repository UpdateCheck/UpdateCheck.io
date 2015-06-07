(() => {
    'use strict';

    angular
        .module('app.core')
        .controller('HeaderController', HeaderController);


    function HeaderController($mdDialog, locker, $mdToast, $translate) {
        var vm = this;

        vm.user     = null;

        vm.register = register;
        vm.login    = login;
        vm.logout   = logout;

        init();

        ////////////////

        function init() {
            vm.user = locker.get('user');
        }

        function logout() {
            vm.user = null;
            locker.pull('token', 'user');

            $translate('SUCCESSFUL_LOGOUT').then(text => {
                var toast = $mdToast.simple()
                        .content(text)
                        .position('top right')
                    ;

                $mdToast.show(toast);
            });
        }

        function register(ev) {
            // Show registration dialog
            $mdDialog.show({
                controller: dialog,
                templateUrl: 'templates/auth/register.html',
                targetEvent: ev
            });

            function dialog($scope, $mdDialog, $mdToast, Register) {
                $scope.completed = false;

                $scope.user = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
                };

                $scope.register = registerAccount;

                function registerAccount(user) {
                    console.log(user);

                    Register.account(user).then(success);

                    function success(res) {
                        $mdDialog.hide();

                        $translate('SUCCESSFUL_REGISTRATION').then(text => {
                            var toast = $mdToast.simple()
                                    .content(text)
                                    .position('top right')
                                ;

                            $mdToast.show(toast);
                        });
                    }

                }
            }
        }

        function login(ev) {
            // Show log in dialog
            $mdDialog.show({
                controller: dialog,
                templateUrl: 'templates/auth/login.html',
                targetEvent: ev
            });

            function dialog($scope, $mdDialog, $mdToast, Register, locker) {

                $scope.user = {
                    email: '',
                    password: ''
                };

                $scope.login = authenticate;

                function authenticate(user) {
                    console.log(user);

                    Register.authenticate(user).then(success);

                    function success(res) {
                        $mdDialog.hide();

                        locker.put('token', res.data.token);
                        locker.put('user', res.data.user);

                        vm.user = res.data.user;

                        $translate('WELCOME_USER', {
                            firstName: vm.user.firstName
                        });

                        $translate('SUCCESSFUL_LOGIN').then(text => {
                            var toast = $mdToast.simple()
                                    .content(text)
                                    .position('top right')
                                ;

                            $mdToast.show(toast);
                        });
                    }

                }
            }
        }


    }
})();