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
    '$state'
];


function sideboardController($rootScope, $scope, $log, $state) {

    var vm = this;
    $log.debug('sideboardController');


    // Setup functions
    vm.navigate = navigate;


    // Setup variables
    vm.stateDetails = null;
    vm.isSideboardOpen = false;


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
    });


    /*
     * toggleSideboard
     */
    $rootScope.$on('sideNavToggle', function() {
        vm.isSideboardOpen = !vm.isSideboardOpen;
    });

}
