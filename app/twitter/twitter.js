'use strict'

angular.module('myApp.twitter', [])

.controller('TwitterListCtrl', function($scope, Twitters) {
	$scope.tweet = "This is the string";
})