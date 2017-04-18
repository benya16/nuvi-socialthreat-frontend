angular.module('myApp').controller('HomeController', ['socket', function(socket)
{
    var map;
    var rtn = this;

    socket.on('init', function ()
    {
        console.log("socket connected");
        socket.emit('join');
    });

    socket.on('handshake', function()
    {
        console.log("hand shake completed");
    });

    window.getData = function ()
    {
        $.get('/data/manualthreats.csv', function (data)
        {
            rtn.data = $.csv.toObjects(data);
            randomizeMarkers()
        });
    };

    window.initMap = function() {
        var uluru = {lat: 28.0339, lng: 1.6596};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 2,
            center: uluru
        });
        getData()
    };

    var markers = [];
    var demoJson = [];
    var liveJson = [];

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
    };

    window.setDemo = function()
    {
        clearMarkers();
        demoJson.forEach(function (json)
        {
            buildMarker(json.latitude, json.longitude, json.raw_body_text);
        });
    };

    window.clearMarkers = function()
    {
        markers.forEach(function (mark)
        {
            mark.setMap(null);
        });
        markers.length = 0;
    };
    
    window.randomizeMarkers = function () {
        for (i = 0; i < rtn.data.length; i++) {
            (function(i) {
                setTimeout(function () {
                    console.log('Json: ', rtn.data[i].json);
                    var json = JSON.parse(rtn.data[i].json);
                    console.log('Latitude: ', json.latitude);
                    console.log('Longitude: ', json.longitude);
                    console.log('City: ', json.location_display_name);

                    demoJson.push(json);
                    buildMarker(json.latitude, json.longitude, json.raw_body_text);

                }, Math.floor(Math.random() * 10000000));
            })(i);
        }
    };

    // $(document).ready(function () {
    //     $(document).ready(function () {
    //         randomizeMarkers();
    //     });
    // });

}]);