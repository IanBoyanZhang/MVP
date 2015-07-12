'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

// How to use array for proper minification
.controller('View1Ctrl', function($scope) {
	$scope.data = "Test string";
	var initialize = function() {
		var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(-34.397, 150.644)
		};
	};
	// $scope.data = {};
	initialize();
})

// .directive('myDirective', function() {
// 	return {
// 		restrict: "C",
// 		scope: {
// 			title: '@'			
// 		},
// 		// template: '<div>{{ myVal }}</div>'
// 		// templateUrl: 'xxx.html',
// 		// controller: controllerFunction //Embed a custom controller in the directive
// 		link: function($scope, element, attrs) { 	// DOM manipulation

// 		}
// 	}
// })

.directive('mapDirective', function () {
    return {
    	// restrict: 'C',
        link: function ($scope, element, attrs) {
        	// console.log($scope);
            element.bind('click', function () {
                element.html('You clicked me!');
            });
            element.bind('mouseenter', function () {
                element.css('background-color', 'yellow');
            });
            element.bind('mouseleave', function () {
                element.css('background-color', 'white');
            });
        }
    };
});