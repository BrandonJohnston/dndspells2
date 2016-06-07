/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('topNavController', topNavController);


topNavController.$inject = [
    '$rootScope',
    '$scope',
    '$log'
];


function topNavController($rootScope, $scope, $log) {

    var vm = this;
    $log.debug('topNavController');


    // Setup functions
    vm.toggleSideboard = toggleSideboard;


    // Setup variables
    vm.isToggleOpen = false;


    /*
     * toggleSideboard
     */
    function toggleSideboard() {
        vm.isToggleOpen = !vm.isToggleOpen;
        $rootScope.$broadcast('sideNavToggle');
    }

}
