angular.module('myApp').controller('HomeController', ['socket', function(socket)
{
    var map;
    var rtn = this;
    var markers = [];
    var demoJson = [];
    var liveJson = [];
    var live = false;

    socket.on('init', function ()
    {
        console.log("socket connected");
        socket.emit('join');
    });

    socket.on('handshake', function()
    {
        console.log("hand shake completed");
    });

    socket.on('liveupdate', function()
    {
        console.log("LIVE UPDATE");
        $.get("/liveupdate", function(data)
        {
            data.forEach(function (object)
            {
                var raw = bin2String(object.post.data);
                var json = JSON.parse(raw);
                liveJson.push(json);
                if (liveJson.length > 20)
                {
                    liveJson.shift();
                }
                buildMarker(json.latitude, json.longitude, json.raw_body_text, json.activity_url);
            });
        });
    });

    window.getData = function ()
    {
        getLiveData();
        $.get('/data/manualthreats.csv', function (data)
        {
            rtn.data = $.csv.toObjects(data);
            randomizeMarkers()
        });
    };

    window.getLiveData = function()
    {
        liveJson.length = 0;
        $.get("/livedata", function(data)
        {
            data.forEach(function (object)
            {
                var raw = bin2String(object.post.data);
                var json = JSON.parse(raw);
                liveJson.push(json);
            });
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

    window.buildMarker = function(latitude, longitude, post, url) {
        var marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            title: post,
            animation: google.maps.Animation.DROP,
            map: map
        });


        var infowindow = new google.maps.InfoWindow({
          content: post + "\n" + "<a href='"+ url + "' target='_blank'>" + url + "</a>"
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
        live = false;
        $("#live").removeClass("active");
        $("#demo").addClass("active");
        clearMarkers();
        demoJson.forEach(function (json)
        {
            buildMarker(json.latitude, json.longitude, json.raw_body_text, json.activity_url);
        });
    };

    window.setLive = function()
    {
        live = true;
        $("#demo").removeClass("active");
        $("#live").addClass("active");
        clearMarkers();
        liveJson.forEach(function (json)
        {
            buildMarker(json.latitude, json.longitude, json.raw_body_text, json.activity_url);
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
                    if (demoJson.length > 20)
                    {
                        demoJson.shift();
                    }
                    if (!live)
                    {
                        buildMarker(json.latitude, json.longitude, json.raw_body_text, json.activity_url);
                    }

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

function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
        result += String.fromCharCode(parseInt(array[i], 10));
    }
    return result;
}