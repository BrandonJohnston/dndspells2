/**
 * Created by brandonj on 11/11/16.
 */

angular
    .module('dnd.ui')
    .controller('createSpellbookController', createSpellbookController);


createSpellbookController.$inject = [
    '$scope',
    '$log',
    '$translate',
    'UserService',
    'SpellListService',
    'SpellbookService'
];


function createSpellbookController($scope, $log, $translate, UserService, SpellListService, SpellbookService) {

    var vm = this;
    $log.debug('createSpellbookController');


    // Setup functions
    vm.isListDisabled = isListDisabled;
    vm.checkSaveButton = checkSaveButton;
    vm.createSpellbook = createSpellbook;


    // Setup variables
    var translationKeys = [
        'dndspells.SPELL_LIST.CLASS_FILTER_LABEL',
        'dndspells.SPELL_LIST.ALL'
    ];
    vm.userData = null;
    vm.spellListConfig = {
        mode: 'create'
    };
    vm.spellClassesDropdown = {};
    vm.spellbookData = {
        charName: null,
        charClass: null,
        userId: null,
        private: false,
        spells: [],
        formError: false
    };


    $translate(translationKeys).then(function(translations) {
        init(translations);
    });


    /*
     * Initialize
     */
    function init(translations) {

        // Add the 'All' option to the filter dropdown
        var option = {
            id: '0',
            name: translations['dndspells.SPELL_LIST.ALL'],
            value: null
        };

        vm.spellClassesDropdown = angular.copy(SpellListService.spellClassConfig(option));

        // Get user data
        checkUserData();
    }


    /*
     * checkUserData - load user data
     */
    function checkUserData() {

        vm.userData = UserService.getUserData() || null;
    }


    /*
     * isListDisabled - returns true / false if spell list should be disabled
     */
    function isListDisabled() {

        return vm.spellClassesDropdown.selectedClass &&
                vm.spellClassesDropdown.selectedClass.value !== '0' &&
                vm.spellClassesDropdown.selectedClass.value ? false : true;
    }


    /*
     * checkSaveButton
     */
    function checkSaveButton() {

        return vm.spellbookData.charName && !isListDisabled();
    }


    /*
     * createSpellbook
     */
    function createSpellbook() {

        $log.debug('createSpellbookController :: createSpellbook');
        $log.debug(vm.spellbookData);

        //SpellbookService.createSpellbook('data').then(function(response) {
        //
        //});
    }
}
