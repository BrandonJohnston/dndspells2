/**
 * Created by brandonj on 8/18/16.
 */

angular
    .module('dnd.ui')
    .directive('dndSignupForm', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/userSignup/signupView.html',
                controller: 'signupController',
                controllerAs: 'vm'
            };
        }
    ]);
