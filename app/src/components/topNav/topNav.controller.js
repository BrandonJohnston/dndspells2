/**
 * Created by brandonj on 6/7/16.
 */

angular
    .module('dnd.ui')
    .controller('topNavController', topNavController);


topNavController.$inject = [
    "$scope",
    "$log"
];


function topNavController($scope, $log) {

    var vm = this;
    $log.debug("topNavController");

}
