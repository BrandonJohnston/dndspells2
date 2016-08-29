/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('loginController', loginController);


loginController.$inject = [
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function loginController($scope, $log, $state, UserService) {

    var vm = this;
    $log.debug('loginController');


    // Setup functions
    vm.login = login;


    // Setup variables
    vm.loginData = {
        'userEmail': null,
        'userPassword': null,
        'loginError': false
    };


    /*
     * login
     */
    function login() {
        $log.debug('loginController::login');

        UserService.loginUser(vm.loginData).then(function(response) {

                if (response.data.loggedin) {
                    UserService.setUserData(response.data);
                    $state.go('dashboard');
                } else {

                    if (response.data.error === 105) {
                        vm.loginData.loginError = true;
                    }
                }

            },
            function (errorResp) {
                $log.debug('UserService errorResp:');
                $log.debug(errorResp);
            });
    }

}
