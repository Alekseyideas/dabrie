// When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', initMaps);

function initMaps() {
    initMap('north-america-map');
    initMap('afrika-map');
    initMap('asia-map');
    initMap('malaysia-map');
    initMap('japan-map');
    initMap('australia-map');
    initMap('map');
}

function initMap($id) {
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{"saturation": "-100"}]
        }, {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": "-100"}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"lightness": "30"}]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"lightness": "40"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
        }, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}]
    };

    var mapElement = document.getElementById($id);
    var map = new google.maps.Map(mapElement, mapOptions);

    var homer = {
        url: 'assets/images/icons/map-marker.svg',
        scaledSize: new google.maps.Size(130, 145),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(65, 90)
    }

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: 'Snazzy!',
        icon: homer
    });
}