(() => {
    'use strict';

    angular
        .module('app.home', ['ui.router'])
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/homepage.html'
            })
        ;
    }
})();