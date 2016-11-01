/**
 * Created by brandonj on 10/31/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('SpellListService', SpellListService);

    SpellListService.$inject = ['$log', '$http'];

    function SpellListService($log, $http) {

        var service = {
            getSpells5e: getSpells5e
        };

        return service;


        /*
         * getSpells5e - get 5e spell data
         */
        function getSpells5e() {

            $log.debug('SpellListService');

            return $http({
                url: 'http://127.0.0.1/personal/dndspells2-api/api.php/api/5e/spells/getspells',
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                params: {
                    spellSlug: 'all'
                }
            });
        }

    }
})();
