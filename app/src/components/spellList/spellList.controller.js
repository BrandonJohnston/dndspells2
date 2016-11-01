/**
 * Created by brandonj on 10/31/16.
 */

angular
    .module('dnd.ui')
    .controller('spellListDirectiveController', spellListDirectiveController);


spellListDirectiveController.$inject = [
    '$log',
    'SpellListService'
];


function spellListDirectiveController($log, SpellListService) {

    var vm = this;
    $log.debug('spellListDirectiveController');


    // Setup functions
    vm.getSpells = getSpells;


    // Setup variables
    vm.spellsData = null;


    getSpells();


    /*
     * getSpells
     */
    function getSpells() {
        $log.debug('spellListDirectiveController:: getSpells()');

        SpellListService.getSpells5e().then(function(response) {

            vm.spellsData = angular.copy(response.data);

            $log.debug('vm.spellsData:');
            $log.debug(vm.spellsData);
        });
    }
}
