/**
 * Created by brandonj on 11/12/16.
 */

angular
    .module('dnd.ui')
    .controller('viewSpellbookController', viewSpellbookController);


viewSpellbookController.$inject = [
    '$scope',
    '$stateParams',
    '$log',
    'UserService'
];


function viewSpellbookController($scope, $stateParams, $log, UserService) {

    var vm = this;
    $log.debug("viewSpellbookController");


    // Setup functions



    // Setup variables
    vm.spellbookId = $stateParams.spellbookId || null;



}
