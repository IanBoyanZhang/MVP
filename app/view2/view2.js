'use strict';

angular.module('myApp.view2', [])
.controller('View2Ctrl', ['DataComm', function(DataComm) {
	// DataComm.getData();
	DataComm.getData().then(function(dataResponse, status, headers, config) {
		// $scope.data = dataResponse;
		console.log("Data response: ", dataResponse.data);
	})
}]);