/**
 * Created by brandonj on 11/2/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .constant('SpellsConstants', spellsConstants());

    function spellsConstants(){
        return {
            'SPELL_LEVELS': [
                {
                    id: '0',
                    name: '0',
                    value: '0'
                },
                {
                    id: '1',
                    name: '1',
                    value: '1'
                },
                {
                    id: '2',
                    name: '2',
                    value: '2'
                },
                {
                    id: '3',
                    name: '3',
                    value: '3'
                },
                {
                    id: '4',
                    name: '4',
                    value: '4'
                },
                {
                    id: '5',
                    name: '5',
                    value: '5'
                },
                {
                    id: '6',
                    name: '6',
                    value: '6'
                },
                {
                    id: '7',
                    name: '7',
                    value: '7'
                },
                {
                    id: '8',
                    name: '8',
                    value: '8'
                }
            ]
        }
    }


})();
