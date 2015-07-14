'use strict';

angular.module('myApp.view1', [])
.controller('View1Ctrl', function($scope, View1) {
    var mapOptions = {
        zoom: 12,
        center: new google.maps.LatLng(37.7833, -122.4167),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        // styles: View1.defaultStyle
        styles: View1.homageToToner
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
});