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
    'SpellListService'
];


function spellListDirectiveController($scope, $log, $translate, SpellListService) {

    var vm = this;
    $log.debug('spellListDirectiveController');


    // Setup functions
    vm.getSpells = getSpells;
    vm.getSchoolTranslation = getSchoolTranslation;
    vm.getLevelTranslation = getLevelTranslation;
    vm.setOrderProp = setOrderProp;
    vm.toggleSpellSelected = toggleSpellSelected;
    vm.checkSpellSelected = checkSpellSelected;


    // Setup variables
    vm.listConfig = {
        listMode: $scope.listMode || 'view',
        listClassFilter: $scope.listClassFilter || null,
        listDisabled: $scope.listDisabled || false
    };
    vm.spellsData = null;
    vm.selectedSpells = $scope.selectedSpells || [];
    vm.spellOrder = 'name';
    vm.spellLevelsDropdown = {};
    vm.spellSchoolsDropdown = {};
    vm.spellClassesDropdown = {};

    $log.debug('spellListController :: inut selectedSpells:');
    $log.debug(vm.selectedSpells);


    // Watch for changes to listClassFilter
    $scope.$watch('listClassFilter', function() {
        vm.listConfig.listClassFilter = angular.copy($scope.listClassFilter) || null;
    });

    // Watch for changes to listDisabled
    $scope.$watch('listDisabled', function() {
        vm.listConfig.listDisabled = angular.copy($scope.listDisabled) || false;
    });


    init();


    function init() {

        // Add the 'All' option to each filter dropdown
        var option = {
            id: '0',
            name: $translate.instant('dndspells.SPELL_LIST.ALL'),
            value: null
        };


        vm.spellLevelsDropdown = angular.copy(SpellListService.spellLevelConfig(option));
        vm.spellSchoolsDropdown = angular.copy(SpellListService.spellSchoolConfig(option));

        if (vm.listConfig.listMode === 'view') {
            vm.spellClassesDropdown = angular.copy(SpellListService.spellClassConfig(option));
        }


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
    function setOrderProp(prop) {

        vm.spellOrder = prop === vm.spellOrder ? '-' + prop : prop;
    }


    /*
     * toggleSpellSelected - add / remove spell from selected spell list
     */
    function toggleSpellSelected(spellId) {

        $log.debug('toggleSpellSelected(spellId) ');
        $log.debug(spellId);

        var found = false;

        found = spellNeedleSearch(spellId);

        if (found.found) {
            vm.selectedSpells.splice(found.key, 1);
        } else {
            vm.selectedSpells.push(spellId);
        }

        $log.debug('selected spells:');
        $log.debug(vm.selectedSpells);
    }


    function checkSpellSelected(spellId) {

        var spell = spellNeedleSearch(spellId);

        return spell.found;
    }


    /*
     * checkSpellSelected - return true / false if the spell is selected or not
     */
    function spellNeedleSearch(spellId) {

        var returnSpell = {
            found: false,
            key: null
        };

        angular.forEach(vm.selectedSpells, function(spell, key) {

            if (spell === spellId) {
                returnSpell.found = true;
                returnSpell.key = key;
            }
        });

        return returnSpell;
    }

}
