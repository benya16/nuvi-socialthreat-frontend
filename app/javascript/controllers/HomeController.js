angular.module('myApp').controller('HomeController', ['socket', function(socket) {

    var map;

    socket.on('init', function (data) {
        console.log("Init: ", data);
    });
    
    socket.on('connect', function () {
        console.log("Connected");
    });

    socket.on('foo~bar', function () {
        console.log("Here");
    });

    socket.on('connection', function (client) {
        console.log("Client connected: ", client);
        client.on('event', function (data) {
            console.log("Data: ", data);
        });
    });

    window.initMap = function() {
        var uluru = {lat: -25.363, lng: 131.044};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            title: 'Whatever you want',
            map: map
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


        if(markers.length >= 500) {
            var mark = markers.shift();
            mark.setMap(null);
        }
        markers.push(marker);
    }

}]);