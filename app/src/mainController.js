(function() {
    "use strict";

    angular
        .module("dnd.ui")
        .controller("mainController", mainController);

    mainController.$inject = [
        "$scope",
        "$log"
    ];

    function mainController($scope, $log) {

        $log.debug("mainController");

    }
})();
