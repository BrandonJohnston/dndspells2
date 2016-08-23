/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .controller('homeViewController', homeViewController);


homeViewController.$inject = [
    '$rootScope',
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function homeViewController($rootScope, $scope, $log, $state, UserService) {

    var vm = this;
    $log.debug("homeViewController");


    var userData = UserService.getUserData();
    if (userData) {
        $state.go('dashboard');
    }


    // Setup functions
    vm.checkUserData = checkUserData;


    // Setup variables
    vm.userData = null;


    /*
     * Get any user data
     */
    checkUserData();


    /*
     * UserDataLoaded - initial run user data has been returned
     * this helps users if they are already logged in on first page load
     */
    function checkUserData() {

        vm.userData = UserService.getUserData();
        if (vm.userData) {
            $state.go('dashboard');
        }
    }


    $rootScope.$on('UserDataLoaded', function() {
        checkUserData();
    });

}
