/**
 * Created by brandonj on 8/18/16.
 */

angular
    .module('dnd.ui')
    .controller('signupController', signupController);


signupController.$inject = [
    '$scope',
    '$log',
    '$state',
    'UserService'
];


function signupController($scope, $log, $state, UserService) {

    var vm = this;
    $log.debug('signupController');


    // Setup functions
    vm.signup = signup;


    // Setup variables
    vm.signupData = {
        'userName': null,
        'userEmail': null,
        'userPassword': null
    };


    /*
     * signup
     */
    function signup() {
        $log.debug('signupController::signup');

        UserService.signupUser(vm.signupData).then(function(response) {

            UserService.setUserData(response);
            $state.go('dashboard');
        },
        function (errorResp) {
            $log.debug('UserService errorResp:');
            $log.debug(errorResp);
        });
    }

}
