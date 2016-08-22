/**
 * Created by brandonj on 8/18/16.
 */

(function() {
    "use strict";

    angular
        .module('dnd.ui')
        .factory('UserService', UserService);

    UserService.$inject = ['$log', '$http'];

    function UserService($log, $http) {

        var service = {
            checkLoggedIn: checkLoggedIn,
            setUserData: setUserData,
            getUserData: getUserData,
            signupUser: signupUser,
            logoutUser: logoutUser
        };

        return service;


        var currUserData = null;


        /*
         * checkLoggedIn - see if the user already has a session
         */
        function checkLoggedIn() {
            return $http.get('/api.php/api/user/currentUser');
        }


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

            return $http.post('/api.php/api/user/signup', postData);
        }


        /*
         * logoutUser - sign up a new user
         */
        function logoutUser(userData) {

            $log.debug('userService::logoutUser:');

            return $http.post('/api.php/api/user/logout');
        }

    }
})();
