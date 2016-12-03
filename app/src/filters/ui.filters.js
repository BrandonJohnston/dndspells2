/**
 * Created by brandonj on 12/3/16.
 */

angular
    .module('dnd.ui')
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    })
;
