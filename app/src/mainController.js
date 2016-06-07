/**
 * Created by brandonj on 2/3/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .controller('mainController', mainController);


    mainController.$inject = [
        '$rootScope',
        '$scope',
        '$log'
    ];


    function mainController($rootScope, $scope, $log) {

        var vm = this;
        $log.debug('mainController');


        // Setup functions
        //


        // Setup variables
        vm.isSideboardOpen = false;


        /*
         * toggleSideboard
         */
        $rootScope.$on('sideboardToggle', function() {
            vm.isSideboardOpen = !vm.isSideboardOpen;
        });

    }
})();
