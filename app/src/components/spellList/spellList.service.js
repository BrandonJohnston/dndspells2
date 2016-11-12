/**
 * Created by brandonj on 10/31/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('SpellListService', SpellListService);

    SpellListService.$inject = [
        '$log',
        '$translate',
        '$http',
        '$filter'
    ];

    function SpellListService($log, $translate, $http, $filter) {

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

            var schoolVar = $filter('lowercase')(school);

            switch(schoolVar) {
                case 'abjuration':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ABJURATION');
                case 'conjuration':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_CONJURATION');
                case 'divination':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_DIVINATION');
                case 'enchantment':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ENCHANTMENT');
                case 'evocation':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_EVOCATION');
                case 'illusion':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_ILLUSION');
                case 'necromancy':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_NECROMANCY');
                case 'transmutation':
                    return $translate.instant('dndspells.SPELL_LIST.SCHOOL_TRANSMUTATION');
            }
        }


        /*
         * getSpellClassTranslation - returns the translation for the specific spell class
         */
        function getSpellClassTranslation(spellClass) {

            var classVar = $filter('lowercase')(spellClass);

            switch(classVar) {
                case 'barbarian':
                    return $translate.instant('dndspells.CLASS_LIST.BARBARIAN');
                case 'bard':
                    return $translate.instant('dndspells.CLASS_LIST.BARD');
                case 'cleric':
                    return $translate.instant('dndspells.CLASS_LIST.CLERIC');
                case 'druid':
                    return $translate.instant('dndspells.CLASS_LIST.DRUID');
                case 'fighter':
                    return $translate.instant('dndspells.CLASS_LIST.FIGHTER');
                case 'monk':
                    return $translate.instant('dndspells.CLASS_LIST.MONK');
                case 'paladin':
                    return $translate.instant('dndspells.CLASS_LIST.PALADIN');
                case 'ranger':
                    return $translate.instant('dndspells.CLASS_LIST.RANGER');
                case 'rogue':
                    return $translate.instant('dndspells.CLASS_LIST.ROGUE');
                case 'sorcerer':
                    return $translate.instant('dndspells.CLASS_LIST.SORCERER');
                case 'warlock':
                    return $translate.instant('dndspells.CLASS_LIST.WARLOCK');
                case 'wizard':
                    return $translate.instant('dndspells.CLASS_LIST.WIZARD');
            }
        }

    }
})();
