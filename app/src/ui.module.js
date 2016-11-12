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
        '$stateProvider', '$urlRouterProvider', '$translateProvider', '$locationProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $translateProvider, $locationProvider, $httpProvider) {

            // Allows cross-domain api request / response
            $httpProvider.defaults.useXDomain = true;


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
                })
                .state('spellbook', {
                    url: '/spellbook',
                    templateUrl: 'views/spellbook/5e/spellbookView.html',
                    controller: 'spellbookController',
                    controllerAs: 'vm',
                    stateLabel: 'dndspells.TITLE'
                })
                .state('spellbook.create', {
                    url: '/create',
                    templateUrl: 'views/spellbook/5e/create/createSpellbookView.html',
                    controller: 'createSpellbookController',
                    controllerAs: 'vm',
                    stateLabel: 'dndspells.TITLE'
                })
                .state('spellbook.view', {
                    url: '/view?spellbookId',
                    templateUrl: 'views/spellbook/5e/view/viewSpellbookView.html',
                    controller: 'viewSpellbookController',
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
    ])
    .run(['$rootScope', '$log', '$state', 'UserService',
        function($rootScope, $log, $state, UserService) {

            $log.debug('run block started');

            /*
             * On app load, check is user has a session
             */
            UserService.checkLoggedIn().then(function(response) {

                if(response.data.loggedin) {
                    UserService.setUserData(response.data);
                } else {
                    UserService.setUserData(false);
                }

                $rootScope.$broadcast('UserDataLoaded');

            },
            function(/*errorResp*/) {

                console.log('checkLoggIn error');

            });

        }
    ]);
