'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope) {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(37.7833, -122.4167),
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
});