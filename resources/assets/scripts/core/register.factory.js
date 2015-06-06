(() => {
    'use strict';

    angular
        .module('app.core')
        .factory('Register', Register);


    function Register($http) {
        return {
            account: account,
            authenticate: authenticate
        };

        ////////////////

        function account(user) {
            return $http.post('/api/users', user);
        }

        function authenticate(user) {
            return $http.post('/api/auth', user);
        }
    }

})();