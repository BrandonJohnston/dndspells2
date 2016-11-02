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
    vm.selectConfig = $scope.config || null;
    vm.selectOptions = $scope.selectOptions || [];
    vm.selectedOption = null;
    vm.isListOpen = false;


    if (!ngModel) {
        return;
    }


    ngModel.$render = function() {
        $log.debug('ngModel.$render');

        var selected = ngModel.$viewValue;
        vm.selectedOption = ngModel.$viewValue;

        $log.debug('selected:');
        $log.debug(selected);

        //$scope.treeSelectedItem = ngModel.$viewValue;
        //if (selected && Array.isArray(selected) && selected.length > 0) {
        //    selected = selected.map(function(element) {
        //        return element.id;
        //    });
        //    $scope.selectedOptions = activateOptions(selected);
        //} else if (selected && !Array.isArray(selected)) {
        //    if (attrs.type === SelectConstant.type.TREE) {
        //        $scope.selectedItem = activateTreeOptions($scope.selectOptions, selected.id);
        //    } else {
        //        $scope.selectedOption = activateOptions([selected.id])[0];
        //    }
        //}
        //if (!ngModel.$viewValue) {
        //    $scope.selectedOption = null;
        //    $scope.selectedOptions.length = 0;
        //}
    };


    /*
     * selectOption - user has clicked to select an option
     */
    function toggleOptionList() {
        $log.debug('dndOptionDropdownController::toggleOptionList():');

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
