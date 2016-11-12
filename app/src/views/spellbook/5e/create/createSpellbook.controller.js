/**
 * Created by brandonj on 11/11/16.
 */

angular
    .module('dnd.ui')
    .controller('createSpellbookController', createSpellbookController);


createSpellbookController.$inject = [
    '$scope',
    '$log',
    'UserService'
];


function createSpellbookController($scope, $log, UserService) {

    var vm = this;
    $log.debug("createSpellbookController");


    // Setup functions



    // Setup variables
    vm.userData = null;
    vm.spellbookData = {
        charName: null,
        charClass: null,
        userId: null,
        private: false,
        spells: [],
        formError: false
    };


    /*
     * Get any user data
     */
    checkUserData();


    /*
     * checkUserData - load user data
     */
    function checkUserData() {

        vm.userData = UserService.getUserData() || null;
    }
}
