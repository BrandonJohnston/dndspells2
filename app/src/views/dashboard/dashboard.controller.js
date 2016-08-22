/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('dashboardController', dashboardController);


dashboardController.$inject = [
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function dashboardController($scope, $log, $state, UserService) {

    var vm = this;
    $log.debug('dashboardController');


    // Setup functions
    vm.logout = logout;


    // Setup variables
    //



    /*
     * logout
     */
    function logout() {
        $log.debug('dashboardController::logout');

        UserService.logoutUser().then(function(response) {

                UserService.setUserData(null);
                $state.go('home');
            },
            function (errorResp) {
                $log.debug('UserService errorResp:');
                $log.debug(errorResp);
            });
    }

}
