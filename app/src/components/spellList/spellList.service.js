/**
 * Created by brandonj on 10/31/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('SpellListService', SpellListService);

    SpellListService.$inject = ['$log', '$translate', '$http'];

    function SpellListService($log, $translate, $http) {

        var service = {
            getSpells5e: getSpells5e,
            getSpellSchoolTranslation: getSpellSchoolTranslation,
            getSpellClassTranslation: getSpellClassTranslation
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


        /*
         * getSpellSchoolTranslation - returns the translation for the specific spell school
         */
        function getSpellSchoolTranslation(school) {
            switch(school) {
                case 'Abjuration':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ABJURATION');
                case 'Conjuration':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_CONJURATION');
                case 'Divination':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_DIVINATION');
                case 'Enchantment':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ENCHANTMENT');
                case 'Evocation':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_EVOCATION');
                case 'Illusion':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ILLUSION');
                case 'Necromancy':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_NECROMANCY');
                case 'Transmutation':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_TRANSMUTATION');
            }
        }


        /*
         * getSpellClassTranslation - returns the translation for the specific spell class
         */
        function getSpellClassTranslation(spellClass) {
            switch(spellClass) {
                case 'Barbarian':
                    return $translate.instant('dndspells.CLASS_LIST.BARBARIAN');
                case 'Bard':
                    return $translate.instant('dndspells.CLASS_LIST.BARD');
                case 'Cleric':
                    return $translate.instant('dndspells.CLASS_LIST.CLERIC');
                case 'Druid':
                    return $translate.instant('dndspells.CLASS_LIST.DRUID');
                case 'Fighter':
                    return $translate.instant('dndspells.CLASS_LIST.FIGHTER');
                case 'Monk':
                    return $translate.instant('dndspells.CLASS_LIST.MONK');
                case 'Paladin':
                    return $translate.instant('dndspells.CLASS_LIST.PALADIN');
                case 'Ranger':
                    return $translate.instant('dndspells.CLASS_LIST.RANGER');
                case 'Rogue':
                    return $translate.instant('dndspells.CLASS_LIST.ROGUE');
                case 'Sorcerer':
                    return $translate.instant('dndspells.CLASS_LIST.SORCERER');
                case 'Warlock':
                    return $translate.instant('dndspells.CLASS_LIST.WARLOCK');
                case 'Wizard':
                    return $translate.instant('dndspells.CLASS_LIST.WIZARD');
            }
        }

    }
})();
