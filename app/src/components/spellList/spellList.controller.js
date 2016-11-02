/**
 * Created by brandonj on 10/31/16.
 */

angular
    .module('dnd.ui')
    .controller('spellListDirectiveController', spellListDirectiveController);


spellListDirectiveController.$inject = [
    '$scope',
    '$log',
    '$translate',
    'SpellListService',
    'SpellsConstants'
];


function spellListDirectiveController($scope, $log, $translate, SpellListService, SpellsConstants) {

    var vm = this;
    $log.debug('spellListDirectiveController');


    // Setup functions
    vm.getSpells = getSpells;
    vm.getSchoolTranslation = getSchoolTranslation;
    vm.getLevelTranslation = getLevelTranslation;
    vm.spellOptionDropdownChanged = spellOptionDropdownChanged;
    vm.setOrderProp = setOrderProp;


    // Setup variables
    vm.spellsData = null;
    vm.spellOrder = 'name';
    vm.spellOptionsDropdown = {};


    init();


    function init() {

        // Set the options dropdown config
        vm.spellOptionsDropdown.config = {
            displayMode: 'block',
            label: $translate.instant('dndspells.SPELL_LIST.LEVEL_FILTER_LABEL')
        };


        // Get spell level options from constant
        vm.spellOptionsDropdown.spellLevels = SpellsConstants.SPELL_LEVELS;
        vm.spellOptionsDropdown.spellLevels[0].name = $translate.instant('dndspells.SPELL_LIST.CANTRIP');


        // Add the 'All' option
        var option = {
            id: '9',
            name: $translate.instant('dndspells.SPELL_LIST.ALL'),
            value: null
        };
        vm.spellOptionsDropdown.spellLevels.unshift(option);


        // Select the first option
        vm.spellOptionsDropdown.selectedLevel = vm.spellOptionsDropdown.spellLevels[0];


        // Get spells data from API
        getSpells();
    }


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


    /*
     * getSepllSchoolLevel - returns text for the spell school and level
     */
    function getSchoolTranslation(school) {

        return SpellListService.getSpellSchoolTranslation(school);
    }


    /*
     * getLevelTranslation - returns text for cantrip or the spell level number
     * helps ordering by level so that text displays 'Cantrip' but shows first in alpha-numeric ordering
     */
    function getLevelTranslation(level) {

        return level === '0' ? $translate.instant('dndspells.SPELL_LIST.CANTRIP') : level;
    }


    /*
     * setOrderProp - change the spell list ordering property
     */
    function spellOptionDropdownChanged(option) {

        $log.debug('spellOptionDropdownChanged() ' + option);

    }


    /*
     * setOrderProp - change the spell list ordering property
     */
    function setOrderProp(prop) {

        $log.debug('setOrderProp() ' + prop);

        vm.spellOrder = prop === vm.spellOrder ? '-' + prop : prop;

        $log.debug('updated spellOrder: ' + vm.spellOrder);
    }

}
