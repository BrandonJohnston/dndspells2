/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .controller('sideboardController', sideboardController);


sideboardController.$inject = [
    '$rootScope',
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function sideboardController($rootScope, $scope, $log, $state, UserService) {

    var vm = this;
    $log.debug('sideboardController');


    // Setup functions
    vm.navigate = navigate;
    vm.checkUserData = checkUserData;


    // Setup variables
    vm.stateDetails = null;
    vm.isSideboardOpen = false;
    vm.userData = null;


    /*
     * Get any user data
     */
    checkUserData();


    /*
     * Navigate to new state when option is clicked in sideboard
     */
    function navigate(newState) {

        if (newState !== vm.stateDetails.name) {
            $state.go(newState);
        }
    }


    /*
     * Update the state when it changes
     */
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        vm.stateDetails = toState;
        vm.userData = UserService.getUserData();
    });


    /*
     * toggleSideboard
     */
    $rootScope.$on('sideboardToggle', function() {
        vm.isSideboardOpen = !vm.isSideboardOpen;
    });


    /*
     * UserDataLoaded - initial run user data has been returned
     * this helps users if they are already logged in on first page load
     */
    function checkUserData() {

        vm.userData = UserService.getUserData();
        if (!vm.userData) {
            $state.go('home');
        }
    }


    $rootScope.$on('UserDataLoaded', function() {
        checkUserData();
    });

}
