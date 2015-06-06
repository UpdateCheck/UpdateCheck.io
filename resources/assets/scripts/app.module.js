(() => {
    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.home',

            'ngAnimate',
            'ngSanitize',

            'angular-locker',
            'ngMaterial',
            'pascalprecht.translate',
            'ui.router'
        ])
        .config(appConfig)
    ;

    function appConfig($compileProvider, $mdThemingProvider, lockerProvider) {
        // TODO: Uncomment when pushing to production
        // $compileProvider.debugInfoEnabled(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('green');

        lockerProvider.setDefaultDriver('session')
            .setDefaultNamespace('updatecheck')
            .setSeparator('.')
            .setEventsEnabled(false);
    }
})();