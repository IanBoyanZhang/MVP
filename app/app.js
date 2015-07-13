'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.twitter',
  'myApp.version'
]).
config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: "/",
		templateUrl: "view1/view1.html",
		controller: "View1Ctrl"
	})
	.state('view2', {
		url: "/view2",
		templateUrl: "view2/view2.html",
		controller: 'View2Ctrl'
	})
	.state('twitter', {
		url: "/twitter",
		templateUrl: "twitter/twitter.html",
		controller: 'TwitterListCtrl'	
	})
})