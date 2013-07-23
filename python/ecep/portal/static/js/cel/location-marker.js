/********************************************************
 * Copyright (c) 2013 Azavea, Inc.
 * See LICENSE in the project root for copying permission
 * Requires: google-maps-api-v3; jquery; leaflet;
 ********************************************************/

'use strict';
 
define(['jquery', 'Leaflet', 'text!templates/location.html', 'icons', 'common', CEL.serverVars.gmapRequire], 
    function($, L, html, icons, common) {

        /* On page load, query api to get locations position, add marker to map
         * for location. Use google maps layer for leaflet.
         */
        $(document).ready(function() {
            var location_id = /(\d+)/.exec(window.location.pathname)[1];
            $.getJSON(common.getUrl('location-api') + location_id, function(data) {
                var loc = data.locations[0],
                    // need to build the template first so leaflet can find the map
                    template = Handlebars.compile(html);

                $('.container > .row').append(template(loc));

                var lat = loc.position.lat,
                    lng = loc.position.lng,
                    map = new L.Map('location-map', {center: new L.LatLng(lat, lng), zoom: 13}),
                    gmap = new L.Google('ROADMAP');
                
                map.addLayer(gmap);
                L.marker([lat, lng], {icon: icons.schoolIcon}).addTo(map);
                map.panTo(new L.LatLng(lat, lng));
            });
        });
    }
);

