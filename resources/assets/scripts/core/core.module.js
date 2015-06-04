(() => {
    'use strict';

    angular
        .module('app.core', ['ui.router'])
        .config(routeConfig);

    function routeConfig($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    }
})();