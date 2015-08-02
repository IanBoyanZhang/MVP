'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope, View1, HeatMapLayer, DataComm) {
	function changeGradient(hMap) {
	  var gradient = [
	    'rgba(0, 255, 255, 0)',
	    'rgba(0, 255, 255, 1)',
	    'rgba(0, 191, 255, 1)',
	    'rgba(0, 127, 255, 1)',
	    'rgba(0, 63, 255, 1)',
	    'rgba(0, 0, 255, 1)',
	    'rgba(0, 0, 223, 1)',
	    'rgba(0, 0, 191, 1)',
	    'rgba(0, 0, 159, 1)',
	    'rgba(0, 0, 127, 1)',
	    'rgba(63, 0, 91, 1)',
	    'rgba(127, 0, 63, 1)',
	    'rgba(191, 0, 31, 1)',
	    'rgba(255, 0, 0, 1)'
	  ]
	  hMap.set('gradient', heatmap.get('gradient') ? null : gradient);
	}

	function changeRadius(hMap) {
	  hMap.set('radius', heatmap.get('radius') ? null : 18);
	}

	function changeOpacity(hMap) {
	  hMap.set('opacity', heatmap.get('opacity') ? null : 0.8);
	}

	var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
	// var newCity = new google.maps.LatLng(37, -122);
    var mapOptions = {
        // zoom: 8,
        // zoom: 12,
        zoom: 11,
        center: sanFrancisco,
        // center: newCity,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        // styles: View1.defaultStyle
        styles: View1.homageToToner
    }

    // Render first
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var heatmap;
	// // heatmap.setMap($scope.map);
	// // Only SF
	DataComm.getData().then(function(dataResponse, status, headers, config) {
		heatmap = new google.maps.visualization.HeatmapLayer({
		  data: HeatMapLayer.layerDataTransform(dataResponse.data),
		  //   data: HeatMapLayer.heatmapData, 		// Testing
		  dissipating: true,
		  map: $scope.map
		});

		changeGradient(heatmap);
		changeRadius(heatmap);
		changeOpacity(heatmap);
	});

	// DataComm.postGetData().then(function(dataResponse, status, headers, config) {
	// 	heatmap = new google.maps.visualization.HeatmapLayer({
	// 	  data: HeatMapLayer.layerDataTransform(dataResponse.data),
	// 	  //   data: HeatMapLayer.heatmapData, 		// Testing
	// 	  dissipating: true,
	// 	  map: $scope.map
	// 	});
	// });

	DataComm.getDataByLink('data/raw').then(function(dataResponse, status, headers, config) {
		heatmap = new google.maps.visualization.HeatmapLayer({
		  data: HeatMapLayer.layerDataTransform(dataResponse.data),
		  //   data: HeatMapLayer.heatmapData, 		// Testing
		  dissipating: true,
		  map: $scope.map
		});
		changeGradient(heatmap);
		changeRadius(heatmap);
		changeOpacity(heatmap);
	});
	// changeGradient
});