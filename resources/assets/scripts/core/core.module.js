(() => {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate',
            'ngSanitize',
            
            'pascalprecht.translate',
            'ui.router'
        ])
        .config(routeConfig);

    function routeConfig($locationProvider, $translateProvider, $translatePartialLoaderProvider) {
        $locationProvider.html5Mode(true);

        $translatePartialLoaderProvider.addPart('auth');
        $translatePartialLoaderProvider.addPart('header');

        $translateProvider
            .useLoader('$translatePartialLoader', {
                urlTemplate: '/i18n/{part}/{lang}.json'
            })
            .preferredLanguage('en_GB')
            .useSanitizeValueStrategy('sanitize');
    }
})();