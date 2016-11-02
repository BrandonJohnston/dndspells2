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
    vm.spellLevelsDropdown = {};
    vm.spellSchoolsDropdown = {};
    vm.spellClassesDropdown = {};


    init();


    function init() {

        // Setup the spell level options dropdown
        vm.spellLevelsDropdown.config = {
            displayMode: 'block',
            label: $translate.instant('dndspells.SPELL_LIST.LEVEL_FILTER_LABEL')
        };
        vm.spellLevelsDropdown.spellLevels = SpellsConstants.SPELL_LEVELS;
        vm.spellLevelsDropdown.spellLevels[0].name = $translate.instant('dndspells.SPELL_LIST.CANTRIP');


        // Setup the spell schools options dropdown
        vm.spellSchoolsDropdown.config = {
            displayMode: 'block',
            label: $translate.instant('dndspells.SPELL_LIST.SCHOOL_FILTER_LABEL')
        };
        vm.spellSchoolsDropdown.spellSchools = SpellsConstants.SPELL_SCHOOLS;
        angular.forEach(vm.spellSchoolsDropdown.spellSchools, function(school, key) {
            vm.spellSchoolsDropdown.spellSchools[key].name = angular.copy(SpellListService.getSpellSchoolTranslation(school.name));
        });


        // Setup the spell classes options dropdown
        vm.spellClassesDropdown.config = {
            displayMode: 'block',
            label: $translate.instant('dndspells.SPELL_LIST.CLASS_FILTER_LABEL')
        };
        vm.spellClassesDropdown.spellClasses = SpellsConstants.SPELL_CLASSES;
        angular.forEach(vm.spellClassesDropdown.spellClasses, function(spellClass, key) {
            vm.spellClassesDropdown.spellClasses[key].name = angular.copy(SpellListService.getSpellClassTranslation(spellClass.name));
        });


        // Add the 'All' option to each filter dropdown
        var option = {
            id: '0',
            name: $translate.instant('dndspells.SPELL_LIST.ALL'),
            value: null
        };
        vm.spellLevelsDropdown.spellLevels.unshift(option);
        vm.spellSchoolsDropdown.spellSchools.unshift(option);
        vm.spellClassesDropdown.spellClasses.unshift(option);


        // Select the first option
        vm.spellLevelsDropdown.selectedLevel = vm.spellLevelsDropdown.spellLevels[0];
        vm.spellSchoolsDropdown.selectedSchool = vm.spellSchoolsDropdown.spellSchools[0];
        vm.spellClassesDropdown.selectedClass = vm.spellClassesDropdown.spellClasses[0];


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
