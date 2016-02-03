/**
 * Created by brandonj on 2/3/16.
 */

/**
 *
 * Licensed Materials – Property of IBM
 *
 * aggregateViewController.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
    .module('dnd.ui')
    .controller('homeViewController', homeViewController);


homeViewController.$inject = [
    "$scope",
    "$log"
];


function homeViewController($scope, $log) {

    var vm = this;
    $log.debug("homeViewController");

}
