/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .directive('dndSideboard', [
        function () {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "components/sideboard/sideboardView.html",
                controller: "sideboardController"
            };
        }
    ]);
