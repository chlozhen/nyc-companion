mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb3poZW4iLCJhIjoiY2xnNXFlMGkxMDF0YzNobjBzeDZ3dTRodyJ9.aEmIpsNVZeh27U2L1z7j_A';

const NYC_COORDINATES = [-73.9973212748431, 40.731095154349916]
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: NYC_COORDINATES, // starting position [lng, lat]
    zoom: 16, // starting zoom
    minZoom: 9.5,
    maxZoom: 18,
    bearing: 0,
    pitch: 0
});

const parks_id = 'Parks'
const plazas_id = 'Pedestrian Plazas'
const restroom_id = "Public Restrooms"
const seats_id = "Street Seats"
const benches_id = "Benches"
const fountains_id = "Water Fountains"
const linkNYC_id = "LinkNYC Kiosk"
const toggleableLayerIds = [parks_id, 
                            plazas_id, 
                            restroom_id, 
                            seats_id, 
                            benches_id, 
                            fountains_id,
                            linkNYC_id]
const colors = ['#b2df8a',
                '#33a02c',
                '#e31a1c',
                '#fdbf6f',
                '#ff7f00',
                '#1f78b4',
                '#a6cee3']

// add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 16
    }),
    'top-left'
);

map.on('load', function () {

    /////////////////////////////////
    // Add nyc park locations
    map.addSource('nyc-parks', {
        type: 'geojson',
        data: './data/nyc-parks.geojson'
    })

    map.addLayer({
        id: parks_id,
        type: 'fill',
        source: 'nyc-parks',
        paint: {
            'fill-opacity': 0.8,
            'fill-color': colors[0]

        }
    }, 'road-label-simple')

    map.on('click', parks_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Park</td>
                        </tr>
                        <tr>
                            <td class="key">Name</td>
                            <td class="value">${e.features[0].properties.name311}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties.location}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // Add nyc pedestrian plazas
    map.addSource('nyc-pedestrianplazas', {
        type: 'geojson',
        data: './data/nyc-pedestrianplazas.geojson'
    })

    map.addLayer({
        id: plazas_id,
        type: 'fill',
        source: 'nyc-pedestrianplazas',
        paint: {
            'fill-opacity': 0.8,
            'fill-color': colors[1]

        }
    }, 'road-label-simple')

    map.on('click', plazas_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Pedestrian Plaza</td>
                        </tr>
                        <tr>
                            <td class="key">Name</td>
                            <td class="value">${e.features[0].properties.plazaname}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties.onstreet}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // add nyc restrooms
    map.addSource('nyc-restrooms', {
        type: 'geojson',
        data: './data/nyc-public-restrooms-2021.geojson'
    });

    map.addLayer({
        id: restroom_id,
        type: 'circle',
        source: 'nyc-restrooms',
        paint: {
            'circle-color': colors[2],
            'circle-radius': 5,
            'circle-opacity': .8
        }
    });

    map.on('click', restroom_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Public Restroom</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties.Location}</td>
                        </tr>
                        <tr>
                            <td class="key">Open Year-Round</td>
                            <td class="value">${e.features[0].properties["Open Year-Round"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Handicap Accessible</td>
                            <td class="value">${e.features[0].properties["Handicap Accessible"]}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // add streetseats
    map.addSource('nyc-streetseats', {
        type: 'geojson',
        data: './data/nyc-streetseats-2014-2019.geojson'
    });

    map.addLayer({
        id: seats_id,
        type: 'circle',
        source: 'nyc-streetseats',
        paint: {
            'circle-color': colors[3],
            'circle-radius': 5,
            'circle-opacity': .8
        }
    });

    map.on('click', seats_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Street Seating</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties["location"]}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // add benches
    map.addSource('nyc-benches', {
        type: 'geojson',
        data: './data/nyc-benches-2022.geojson'
    })

    map.addLayer({
        id: benches_id,
        type: 'circle',
        source: 'nyc-benches',
        paint: {
            'circle-color': colors[4],
            'circle-radius': 5,
            'circle-opacity': .8
        }
    })

    map.on('click', benches_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Bench</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties["address"]}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // add water fountains
    map.addSource('nyc-water-fountains', {
        type: 'geojson',
        data: './data/nyc-water-fountains.geojson'
    })

    map.addLayer({
        id: fountains_id,
        type: 'circle',
        source: 'nyc-water-fountains',
        paint: {
            'circle-color': colors[5],
            'circle-radius': 5,
            'circle-opacity': .8
        }
    })

    map.on('click', fountains_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">Water Fountain</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties["signname"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Position</td>
                            <td class="value">${e.features[0].properties["position"]}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    /////////////////////////////////
    // add linkNYC kiosks
    map.addSource('nyc-linkNYC-kiosk', {
        type: 'geojson',
        data: './data/nyc-LinkNYC.geojson'
    })

    map.addLayer({
        id: linkNYC_id,
        type: 'circle',
        source: 'nyc-linkNYC-kiosk',
        paint: {
            'circle-color': colors[6],
            'circle-radius': 5,
            'circle-opacity': .8
        }
    })

    map.on('click', linkNYC_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">LinkNYC Kiosk</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties["Street Address"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Status</td>
                            <td class="value">${e.features[0].properties["Installation Status"]}</td>
                        </tr>
                    </table>
                    `)
            .addTo(map);
    });

    var myOffcanvas = document.getElementById('offcanvasScrolling')
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
    bsOffcanvas.show()


    // Event handling: toggling layers and points
    // ref: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
    // Set up the corresponding toggle button for each layer.
    toggleableLayerIds.forEach((id, i) => {
        const link = document.getElementById(id)
        link.style.backgroundColor = colors[i]
        map.setLayoutProperty(id, 'visibility', 'visible')

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.id;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
                this.className = 'square';
                this.style.backgroundColor = "#ccc";
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            } else {
                this.className = 'square active';
                this.style.backgroundColor = colors[i];
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };
    });
});


// // Functions for filtering markers
// function remove_marker(marker_list) {
//     for (var i = 0; i < marker_list.length; i++) {
//         marker_list[i].remove()
//     }
// }
// function add_marker(marker_list) {
//     for (var i = 0; i < marker_list.length; i++) {
//         marker_list[i].addTo(map)
//     }
// }

// function filter_markers(link, id, activeClass, markerlist){
//     link.onclick = function (e) {
//         console.log(e.textContent)
//         var ele = document.getElementById(id)
//         console.log(ele.className)
//         if (ele.className.includes(activeClass)) {
//             ele.className = ""
//             remove_marker(markerlist)
//         }
//         else {
//             ele.className = activeClass
//             add_marker(markerlist)
//         }
//     }
// }
