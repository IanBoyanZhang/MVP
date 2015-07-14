'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope, View1, HeatMapLayer) {
	var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);
    var mapOptions = {
        zoom: 12,
        center: sanFrancisco,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        // styles: View1.defaultStyle
        styles: View1.homageToToner
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var heatmap = new google.maps.visualization.HeatmapLayer({
	  data: HeatMapLayer.heatmapData,
	  dissipating: true,
	  map: $scope.map
	});
	// heatmap.setMap($scope.map);
});