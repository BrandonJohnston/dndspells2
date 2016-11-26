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

            var postData = {
                private: false,
                char_name: data.charName,
                char_class: data.charClass,
                spells: data.spells,
                id: data.userId
            };

            return $http({
                url: 'http://localhost/personal/dndspells2-api/api.php/api/spellbook/create',
                method: 'POST',
                data: postData,
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }


    }
})();
