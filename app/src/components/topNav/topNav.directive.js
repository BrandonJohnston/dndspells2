/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .directive('dndTopNav', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/topNav/topNavView.html',
                controller: 'topNavController',
                controllerAs: 'vm'
            };
        }
    ]);
