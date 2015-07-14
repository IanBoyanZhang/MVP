'use strict';

angular.module('myApp.view2', [])
.controller('View2Ctrl', ['$scope', 'DataComm', function($scope, DataComm) {
	// DataComm.getData();
	DataComm.getData().then(function(dataResponse, status, headers, config) {
		$scope.data = dataResponse.data;
		// console.log("Data response: ", dataResponse.data);
	})
}]);