/**
 * Created by benya16 on 18/04/2017.
 */
angular.module('myApp').controller('LiveController', [function() {

    var map;

    window.initMap = function() {
        var uluru = {lat: 28.0339, lng: 1.6596};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: uluru
        });
    }

    var markers = [];

    window.buildMarker = function(latitude, longitude, post) {
        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            title: post,
            animation: google.maps.Animation.DROP,
            map: map
        });


        var infowindow = new google.maps.InfoWindow({
            content: post
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });


        if(markers.length >= 20) {
            var mark = markers.shift();
            mark.setMap(null);
        }
        markers.push(marker);
    }

}]);