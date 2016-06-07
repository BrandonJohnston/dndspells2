/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .controller('sideboardController', sideboardController);


sideboardController.$inject = [
    '$rootScope',
    '$scope',
    '$log'
];


function sideboardController($rootScope, $scope, $log) {

    var vm = this;
    $log.debug('sideboardController');


    // Setup functions
    //vm.toggleSideboard = toggleSideboard;


    // Setup variables
    vm.isSideboardOpen = false;


    /*
     * toggleSideboard
     */
    $rootScope.$on('sideNavToggle', function() {
        vm.isSideboardOpen = !vm.isSideboardOpen;
    });

}
