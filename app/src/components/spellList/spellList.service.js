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
        '$filter',
        'SpellsConstants'
    ];

    function SpellListService($log, $translate, $http, $filter, SpellsConstants) {

        var service = {
            getSpells5e: getSpells5e,
            getSpellSchoolTranslation: getSpellSchoolTranslation,
            getSpellClassTranslation: getSpellClassTranslation,
            getSpellSourceTranslation: getSpellSourceTranslation,
            spellLevelConfig: spellLevelConfig,
            spellSchoolConfig: spellSchoolConfig,
            spellClassConfig: spellClassConfig
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
                cache: true,
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


        /*
         * getSpellSourceTranslation - returns the translation for the specific spell source book
         */
        function getSpellSourceTranslation(spellSource) {

            var source = spellSource;

            switch(source) {
                case '1':
                    return $translate.instant('dndspells.SPELL_LIST.SOURCE_PHB');
                case '2':
                    return $translate.instant('dndspells.SPELL_LIST.SOURCE_MM');
                case '3':
                    return $translate.instant('dndspells.SPELL_LIST.SOURCE_DMG');
                default:
                    return $translate.instant('dndspells.SPELL_LIST.SOURCE_UNKNOWN');
            }
        }


        /*
         * spellLevelConfig - defined the config and data for the level dropdown
         */
        function spellLevelConfig(option) {

            var spellLevelObj = {};

            spellLevelObj.config = {
                displayMode: 'block',
                label: $translate.instant('dndspells.SPELL_LIST.LEVEL_FILTER_LABEL')
            };
            spellLevelObj.spellLevels = SpellsConstants.SPELL_LEVELS;
            spellLevelObj.spellLevels[0].name = $translate.instant('dndspells.SPELL_LIST.CANTRIP');

            if (spellLevelObj.spellLevels[0].id !== '0') {
                spellLevelObj.spellLevels.unshift(option);
            } else {
                spellLevelObj.spellLevels[0] = option;
            }

            spellLevelObj.selectedLevel = spellLevelObj.spellLevels[0];

            return spellLevelObj;
        }


        /*
         * spellSchoolConfig - defined the config and data for the schools dropdown
         */
        function spellSchoolConfig(option) {

            var spellSchoolObj = {};

            spellSchoolObj.config = {
                displayMode: 'block',
                label: $translate.instant('dndspells.SPELL_LIST.SCHOOL_FILTER_LABEL')
            };
            spellSchoolObj.spellSchools = SpellsConstants.SPELL_SCHOOLS;
            angular.forEach(spellSchoolObj.spellSchools, function(school, key) {
                spellSchoolObj.spellSchools[key].name = angular.copy(getSpellSchoolTranslation(school.name));
            });

            if (spellSchoolObj.spellSchools[0].id !== '0') {
                spellSchoolObj.spellSchools.unshift(option);
            } else {
                spellSchoolObj.spellSchools[0] = option;
            }

            spellSchoolObj.selectedSchool = spellSchoolObj.spellSchools[0];

            return spellSchoolObj;
        }


        /*
         * spellClassConfig - defined the config and data for the classes dropdown
         */
        function spellClassConfig(option) {

            var spellClassesObj = {};

            spellClassesObj.config = {
                displayMode: 'block',
                label: $translate.instant('dndspells.SPELL_LIST.CLASS_FILTER_LABEL')
            };
            spellClassesObj.spellClasses = SpellsConstants.SPELL_CLASSES;
            angular.forEach(spellClassesObj.spellClasses, function(spellClass, key) {
                spellClassesObj.spellClasses[key].name = angular.copy(getSpellClassTranslation(spellClass.name));
            });

            if (spellClassesObj.spellClasses[0].id !== '0') {
                spellClassesObj.spellClasses.unshift(option);
            } else {
                spellClassesObj.spellClasses[0] = option;
            }

            spellClassesObj.selectedClass = spellClassesObj.spellClasses[0];

            return spellClassesObj;
        }

    }
})();
