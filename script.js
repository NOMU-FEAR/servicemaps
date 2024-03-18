var locations = [
    ['Tule Ponds', '2000 Stevenson Blvd, Fremont, CA 94538', 'https://www.msnucleus.org/classes/tule.htm'],
    ['humble abode', '1612 Hidden Creek Lane, Fremont, CA, 94538', 'https://www.youtube.com'],
   
];


var geocoder;
var map;
var bounds = new google.maps.LatLngBounds();
var previousInfoWindow = false;


function initialize() {
    map = new google.maps.Map(
    document.getElementById("map_canvas"), {
        center: new google.maps.LatLng(37.4419, -122.1419),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();




    fetch('data.json')
       .then(response => response.json())
       .then(locations => {
           locations.forEach(location => {
               geocodeAddress(location);
           });
       })
       .catch(error => console.error("Failed to load locations:", error));
}

google.maps.event.addDomListener(window, "load", initialize);


function geocodeAddress(location) {
    var title = location.name;
    var address = location.address;
    var url = location.url;
    geocoder.geocode({
        'address': address
    },


    function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                map: map,
                position: results[0].geometry.location,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address,
                url: url
            })
            infoWindow(marker, map, title, address, url);
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
        } else {
            alert("geocode of " + address + " failed:" + status);
        }
    }, {once:true});
}


function infoWindow(marker, map, title, address, url) {
    

    google.maps.event.addListener(marker, 'click', function () {
        var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
        // function load() {
        //     document.body.removeEventListener('click', load)
        //     window.open('https://google.com/', '_blank')
            
        // }

        // window.onload = function() {
        //     document.body.addEventListener('click', load)
        // }

        var iw = new google.maps.InfoWindow({
            content: html,
            maxWidth: 350
        });
        if (previousInfoWindow) {
            previousInfoWindow.close()
        }
        previousInfoWindow = iw
        iw.open(map, marker);
    });
}




function createMarker(results) {
    var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
        map: map,
        position: results[0].geometry.location,
        title: title,
        animation: google.maps.Animation.DROP,
        address: address,
        url: url,
        des: des,
    })
    bounds.extend(marker.getPosition());
    map.fitBounds(bounds);
    infoWindow(marker, map, title, address, url, des);
    return marker;
}


document.getElementById('goButton').addEventListener('click', function() {
   var geocoder = new google.maps.Geocoder();
   var address = document.getElementById('placeInput').value;




   geocoder.geocode({ 'address': address }, function (results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
           map.setCenter(results[0].geometry.location);
           var marker = new google.maps.Marker({
               map: map,
               position: results[0].geometry.location,
               title: address
           });
       } else {
           alert('Geocode was not successful for the following reason: ' + status);
       }
   });
});




    // tell the embed parent frame the height of the content
      if (window.parent && window.parent.parent){
        window.parent.parent.postMessage(["resultsFrame", {
          height: document.body.getBoundingClientRect().height,
          slug: "5zorLwa4"
        }], "*")
      }


    // always overwrite window.name, in case users try to set it manually
      window.name = "result"
