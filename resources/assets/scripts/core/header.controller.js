(() => {
    'use strict';

    angular
        .module('app.core')
        .controller('HeaderController', HeaderController);


    function HeaderController($mdDialog, locker) {
        var vm = this;

        vm.user     = locker.get('user');

        vm.register = register;
        vm.login    = login;
        vm.logout   = logout;

        ////////////////

        function logout() {
            vm.user = null;
            locker.pull('token', 'user');
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
                        var toast = $mdToast.simple()
                                .content('You\'ve successfully registered!')
                                .position('top 60px right')
                            ;

                        $mdToast.show(toast);
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

                        var toast = $mdToast.simple()
                                .content('You\'ve successfully logged in!')
                                .position('top 60px right')
                            ;

                        $mdToast.show(toast);
                    }

                }
            }
        }


    }
})();