/**
 * Created by brandonj on 10/6/15.
 */

angular.module('dnd.ui', [
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.bootstrap'
])
    .config([
        "$stateProvider", "$urlRouterProvider", "$translateProvider", "$httpProvider",
        function($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider) {

            $urlRouterProvider.otherwise('/'); //redirects undefined states to /
            $stateProvider
                .state("default", {
                    url: "/",
                    templateUrl: "components/home/homeView.html",
                    stateLabel: "dndspells.TITLE"
                });


            // Configure translations
            // TODO: Update language keys section appropriately. See https://angular-translate.github.io/docs/#/guide/09_language-negotiation
            $translateProvider
                .useStaticFilesLoader({
                    prefix: 'i18n/',
                    suffix: '.json'
                })
                .registerAvailableLanguageKeys(['en'], {
                    'pseudo': 'pseudo',
                    'en_US': 'en'
                })
                .determinePreferredLanguage()
                .fallbackLanguage('en');

            // Protect from insertion attacks in the translation values.
            $translateProvider.useSanitizeValueStrategy("sanitizeParameters");


        }
    ]);
