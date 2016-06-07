/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('spellListController', spellListController);


spellListController.$inject = [
    "$scope",
    "$log"
];


function spellListController($scope, $log) {

    var vm = this;
    $log.debug("spellListController");

}
