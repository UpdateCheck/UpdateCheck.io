(() => {
    'use strict';

    angular
        .module('app', [
                'app.core',
                'app.home',

                'ngMaterial'
            ])
        .config(appConfig)
    ;

    function appConfig($compileProvider, $mdThemingProvider) {
        // TODO: Uncomment when pushing to production
        // $compileProvider.debugInfoEnabled(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('green');
    }
})();