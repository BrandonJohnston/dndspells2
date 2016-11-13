/**
 * Created by brandonj on 11/2/16.
 */

angular
    .module('dnd.ui')
    .controller('dndOptionDropdownController', dndOptionDropdownController);


dndOptionDropdownController.$inject = [
    '$element',
    '$scope',
    '$log'
];


function dndOptionDropdownController($element, $scope, $log) {

    var vm = this;
    $log.debug('dndOptionDropdownController');


    // Setup functions
    vm.toggleOptionList = toggleOptionList;
    vm.selectOption = selectOption;


    // Setup variables
    var ngModel = $element.controller('ngModel');
    vm.dropdownDisabled = $scope.dropdownDisabled || false;
    vm.selectConfig = $scope.config || null;
    vm.selectOptions = $scope.selectOptions || [];
    vm.selectedOption = null;
    vm.isListOpen = false;


    if (!ngModel) {
        return;
    }


    // Watch for changes to dropdownDisabled
    $scope.$watch('dropdownDisabled', function() {
        vm.dropdownDisabled = angular.copy($scope.dropdownDisabled) || false;
    });


    ngModel.$render = function() {

        vm.selectedOption = ngModel.$viewValue;

        if (!vm.selectedOption) {
            vm.selectedOption = vm.selectOptions[0];
        }
    };


    /*
     * selectOption - user has clicked to select an option
     */
    function toggleOptionList() {
        $log.debug('dndOptionDropdownController::toggleOptionList():');
        $log.debug('vm.dropdownDisabled: ' + vm.dropdownDisabled);

        // Do not open if the dropdown is disabled
        if (vm.dropdownDisabled) {
            return;
        }

        // Assign the new option as selected
        vm.isListOpen = !vm.isListOpen;
    }


    /*
     * selectOption - user has clicked to select an option
     */
    function selectOption(option) {
        $log.debug('dndOptionDropdownController::selectOption():');
        $log.debug(option);

        // Assign the new option as selected
        vm.selectedOption = option;

        // Update the model
        ngModel.$setViewValue(vm.selectedOption);

        // Close the option list
        vm.isListOpen = false;
    }
}
