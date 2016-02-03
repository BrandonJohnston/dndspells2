/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .controller('sideboardController', sideboardController);


sideboardController.$inject = [
    "$scope",
    "$log"
];


function sideboardController($scope, $log) {

    var vm = this;
    $log.debug("sideboardController");

}
