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
                    id: '1',
                    name: '0',
                    value: '0'
                },
                {
                    id: '2',
                    name: '1',
                    value: '1'
                },
                {
                    id: '3',
                    name: '2',
                    value: '2'
                },
                {
                    id: '4',
                    name: '3',
                    value: '3'
                },
                {
                    id: '5',
                    name: '4',
                    value: '4'
                },
                {
                    id: '6',
                    name: '5',
                    value: '5'
                },
                {
                    id: '7',
                    name: '6',
                    value: '6'
                },
                {
                    id: '8',
                    name: '7',
                    value: '7'
                },
                {
                    id: '9',
                    name: '8',
                    value: '8'
                }
            ],
            "SPELL_SCHOOLS": [
                {
                    id: '1',
                    name: 'Abjuration',
                    value: 'Abjuration'
                },
                {
                    id: '2',
                    name: 'Conjuration',
                    value: 'Conjuration'
                },
                {
                    id: '3',
                    name: 'Divination',
                    value: 'Divination'
                },
                {
                    id: '4',
                    name: 'Enchantment',
                    value: 'Enchantment'
                },
                {
                    id: '5',
                    name: 'Evocation',
                    value: 'Evocation'
                },
                {
                    id: '6',
                    name: 'Illusion',
                    value: 'Illusion'
                },
                {
                    id: '7',
                    name: 'Necromancy',
                    value: 'Necromancy'
                },
                {
                    id: '8',
                    name: 'Transmutation',
                    value: 'Transmutation'
                }
            ],
            "SPELL_CLASSES": [
                {
                    id: '1',
                    name: 'Barbarian',
                    value: '1'
                },
                {
                    id: '2',
                    name: 'Bard',
                    value: '2'
                },
                {
                    id: '3',
                    name: 'Cleric',
                    value: '3'
                },
                {
                    id: '4',
                    name: 'Druid',
                    value: '4'
                },
                {
                    id: '5',
                    name: 'Fighter',
                    value: '5'
                },
                {
                    id: '6',
                    name: 'Monk',
                    value: '6'
                },
                {
                    id: '7',
                    name: 'Paladin',
                    value: '7'
                },
                {
                    id: '8',
                    name: 'Ranger',
                    value: '8'
                },
                {
                    id: '9',
                    name: 'Rogue',
                    value: '9'
                },
                {
                    id: '10',
                    name: 'Sorcerer',
                    value: '10'
                },
                {
                    id: '11',
                    name: 'Warlock',
                    value: '11'
                },
                {
                    id: '12',
                    name: 'Wizard',
                    value: '12'
                }
            ]
        }
    }


})();
