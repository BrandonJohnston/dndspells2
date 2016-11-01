/**
 * Created by brandonj on 10/31/16.
 */

angular
    .module('dnd.ui')
    .directive('dndSpellList', [
        function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'components/spellList/spellListView.html',
                controller: 'spellListDirectiveController',
                controllerAs: 'vm'
            };
        }
    ]);
