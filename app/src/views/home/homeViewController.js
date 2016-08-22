/**
 * Created by brandonj on 2/3/16.
 */

angular
    .module('dnd.ui')
    .controller('homeViewController', homeViewController);


homeViewController.$inject = [
    '$scope',
    '$log'
];


function homeViewController($scope, $log) {

    var vm = this;
    $log.debug("homeViewController");

}
