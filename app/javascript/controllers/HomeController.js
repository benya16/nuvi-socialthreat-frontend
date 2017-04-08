(angular.module('myApp').controller('HomeController', function() {

    function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            title: 'Whatever you want',
            map: map
        });
    }

}));