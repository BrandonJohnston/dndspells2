/**
 * Created by brandonj on 11/2/16.
 */

angular
    .module('dnd.ui')
    .directive('dndOptionDropdown', [
        function () {
            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {
                    changeFn: "&?",
                    config: '=?',
                    placeholder: "@?",
                    selectOptions: "=",
                    dropdownDisabled: "=?"
                },
                templateUrl: 'components/dndOptionDropdown/dndOptionDropdownView.html',
                controller: 'dndOptionDropdownController',
                controllerAs: 'vm'
            };
        }
    ]);
