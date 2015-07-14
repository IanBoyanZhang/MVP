'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope, View1, HeatMapLayer, FileReader, DataComm) {
	var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    var mapOptions = {
        zoom: 12,
        center: sanFrancisco,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        // styles: View1.defaultStyle
        styles: View1.homageToToner
    }

    // Render first
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	// heatmap.setMap($scope.map);
	DataComm.getData().then(function(dataResponse, status, headers, config) {
		// $scope.data = dataResponse.data;
		// console.log("Data response: ", dataResponse.data);
		var heatmap = new google.maps.visualization.HeatmapLayer({
		  data: HeatMapLayer.layerDataTransform(dataResponse.data),
		  //   data: HeatMapLayer.heatmapData, 		// Testing
		  dissipating: true,
		  map: $scope.map
		});

		// console.log(dataResponse.data);
	})
});