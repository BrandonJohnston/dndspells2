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
        "$stateProvider", "$urlRouterProvider", "$translateProvider", "$locationProvider", "$httpProvider",
        function($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider, $httpProvider) {


            // TODO: Test removing this when using a real server
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};


            $locationProvider.hashPrefix(''); // Removes index.html in URL
            $locationProvider.html5Mode({enabled: true, requireBase: false});

            $urlRouterProvider.otherwise('/'); //redirects undefined states to /
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home/homeView.html',
                    controller: 'homeViewController',
                    controllerAs: 'vm',
                    stateLabel: 'dndspells.TITLE'
                })
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/dashboardView.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm',
                    stateLabel: 'dndspells.TITLE'
                })
                .state('spells', {
                    url: '/spells',
                    templateUrl: 'views/spellList/spellListView.html',
                    controller: 'spellListController',
                    controllerAs: 'vm',
                    stateLabel: 'dndspells.TITLE'
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
