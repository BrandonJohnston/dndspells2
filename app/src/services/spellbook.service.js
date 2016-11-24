/**
 * Created by brandonj on 11/23/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('SpellbookService', SpellbookService);

    SpellbookService.$inject = ['$log', '$http'];

    function SpellbookService($log, $http) {

        var service = {
            createSpellbook: createSpellbook
        };

        return service;


        /*
         * createSpellbook - POST to create spellbook
         */
        function createSpellbook(data) {

            $log.debug('SpellbookService :: createSpellbook()');
            $log.debug(data);
        }


    }
})();
