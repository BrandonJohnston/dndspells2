/**
 * Created by brandonj on 8/18/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('UserService', userService);

    userService.$inject = ['$log', '$http'];

    function userService($log, $http) {

        var service = {
            setUserData: setUserData,
            getUserData: getUserData,
            signupUser: signupUser
        };

        return service;


        var currUserData = null;


        /*
         * setUserData - save data for use throughout the application
         * @userData - object {name, email, id}
         */
        function setUserData(userData) {
            currUserData = userData;
        }


        /*
         * getUserData - returns the current user's data
         */
        function getUserData() {

            return currUserData;
        }


        /*
         * signupUser - sign up a new user
         * @userData - object {name, email, password}
         */
        function signupUser(userData) {

            $log.debug('userService::signupUser - userData:');

            var postData = {
                'name': userData.userName,
                'email': userData.userEmail,
                'password': userData.userPassword
            };

            return $http.post('http://localhost/personal/dndspells2-api/index.php/api/user/signup', postData);
        }

    }
})();
