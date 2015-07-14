'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope, View1, HeatMapLayer, DataComm) {
	var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
	// var newCity = new google.maps.LatLng(37, -122);
    var mapOptions = {
        zoom: 8,
        // zoom: 12,
        center: sanFrancisco,
        // center: newCity,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        // styles: View1.defaultStyle
        styles: View1.homageToToner
    }

    // Render first
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var heatmap;
	// heatmap.setMap($scope.map);
	DataComm.getData().then(function(dataResponse, status, headers, config) {
		heatmap = new google.maps.visualization.HeatmapLayer({
		  data: HeatMapLayer.layerDataTransform(dataResponse.data),
		  //   data: HeatMapLayer.heatmapData, 		// Testing
		  dissipating: true,
		  map: $scope.map
		});
	});

	DataComm.postGetData().then(function(dataResponse, status, headers, config) {
		heatmap = new google.maps.visualization.HeatmapLayer({
		  data: HeatMapLayer.layerDataTransform(dataResponse.data),
		  //   data: HeatMapLayer.heatmapData, 		// Testing
		  dissipating: true,
		  map: $scope.map
		});
	});

	DataComm.streamData();
});