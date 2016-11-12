/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('topNavController', topNavController);


topNavController.$inject = [
    '$rootScope',
    '$log',
    '$state',
    'UserService'
];


function topNavController($rootScope, $log, $state, UserService) {

    var vm = this;
    $log.debug('topNavController');


    // Setup functions
    vm.navigate = navigate;
    vm.toggleSideboard = toggleSideboard;


    // Setup variables
    vm.userData = null;
    vm.isToggleOpen = false;


    /*
     * navigate - sends the user to homepage or dashboard depending on logged in status
     */
    function navigate() {

        $log.debug('topNavController :: navigate()');

        vm.userData = UserService.getUserData();

        if (vm.userData) {
            $state.go('dashboard');
        } else {
            $state.go('home');
        }
    }


    /*
     * toggleSideboard - broadcast to toggle the sideboard
     */
    function toggleSideboard() {
        $rootScope.$broadcast('sideboardToggle');
    }


    /*
     * listen for sideboardToggle - it can be sent from other views
     */
    $rootScope.$on('sideboardToggle', function() {
        vm.isToggleOpen = !vm.isToggleOpen;
    });

}
