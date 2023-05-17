mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb3poZW4iLCJhIjoiY2xnNXFlMGkxMDF0YzNobjBzeDZ3dTRodyJ9.aEmIpsNVZeh27U2L1z7j_A';

/////////////////////////////////
// Add global variables - map, types of data
const NYC_COORDINATES = [-73.99096559187603, 40.73421219946701]

const map = new mapboxgl.Map({
    container: 'map',        // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: NYC_COORDINATES, // starting position [lng, lat]
    zoom: 14.5,              // starting zoom
    minZoom: 9,              // set min zoom
    maxZoom: 18,             // set max zoom
});

var radius = {               // change as user zooms in/out
    'base': .8,
    'stops': [[12, 1], [18, 8.5]]
}

const opacity = 0.9
const parks_id = 'Parks'
const plazas_id = 'Pedestrian Plazas'
const restroom_id = "Public Restrooms"
const seats_id = "Street Seats"
const benches_id = "Benches"
const fountains_id = "Water Fountains"
const linkNYC_id = "LinkNYC Kiosk"
const pops_id = "Privately Owned Public Spaces (POPS)"

const toggleableLayerIds = [parks_id, plazas_id, restroom_id, seats_id,
    benches_id, fountains_id, linkNYC_id, pops_id]

const filters_design = [
    ['#b2df8a', 'square'],
    ['#33a02c', 'square'],
    ['#e31a1c', 'circle'],
    ['#fdbf6f', 'circle'],
    ['#ff7f00', 'circle'],
    ['#1f78b4', 'circle'],
    ['#799FD9', 'circle'],
    ['#71CEB1', 'circle']]

/////////////////////////////////
// Add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

/////////////////////////////////
// Add search bar
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        zoom: 16
    }),
    'top-left'
);

/////////////////////////////////
// Add gelocator (find user)
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
    }),
    'bottom-left'
);

/////////////////////////////////
// Load Map!
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
            'fill-opacity': opacity,
            'fill-color': filters_design[0][0]

        }
    }, 'road-label-simple')

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
            'fill-opacity': opacity,
            'fill-color': filters_design[1][0]

        }
    }, 'road-label-simple')

    /////////////////////////////////
    // Add nyc restrooms
    map.addSource('nyc-restrooms', {
        type: 'geojson',
        data: './data/nyc-public-restrooms-2021.geojson'
    });
    map.addLayer({
        id: restroom_id,
        type: 'circle',
        source: 'nyc-restrooms',
        paint: {
            'circle-color': filters_design[2][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    });

    /////////////////////////////////
    // Add streetseats
    map.addSource('nyc-streetseats', {
        type: 'geojson',
        data: './data/nyc-streetseats-2014-2019.geojson'
    });
    map.addLayer({
        id: seats_id,
        type: 'circle',
        source: 'nyc-streetseats',
        paint: {
            'circle-color': filters_design[3][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    });

    /////////////////////////////////
    // Add benches
    map.addSource('nyc-benches', {
        type: 'geojson',
        data: './data/nyc-benches-2022.geojson'
    })
    map.addLayer({
        id: benches_id,
        type: 'circle',
        source: 'nyc-benches',
        paint: {
            'circle-color': filters_design[4][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    })

    /////////////////////////////////
    // Add water fountains
    map.addSource('nyc-water-fountains', {
        type: 'geojson',
        data: './data/nyc-water-fountains.geojson'
    })
    map.addLayer({
        id: fountains_id,
        type: 'circle',
        source: 'nyc-water-fountains',
        paint: {
            'circle-color': filters_design[5][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    })

    /////////////////////////////////
    // Add linkNYC kiosks
    map.addSource('nyc-linkNYC-kiosk', {
        type: 'geojson',
        data: './data/nyc-LinkNYC.geojson'
    })
    map.addLayer({
        id: linkNYC_id,
        type: 'circle',
        source: 'nyc-linkNYC-kiosk',
        paint: {
            'circle-color': filters_design[6][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    })

    /////////////////////////////////
    // Add POPS
    map.addSource('nyc-pops', {
        type: 'geojson',
        data: './data/nyc-pops.geojson'
    })
    map.addLayer({
        id: pops_id,
        type: 'circle',
        source: 'nyc-pops',
        paint: {
            'circle-color': filters_design[7][0],
            'circle-radius': radius,
            'circle-opacity': opacity
        }
    })

    /////////////////////////////////
    // Offcanvas sidebar displayed automatically
    var myOffcanvas = document.getElementById('offcanvasScrolling')
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
    bsOffcanvas.show()

    /////////////////////////////////
    // Event handling: toggling layers and points (ref: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/)
    toggleableLayerIds.forEach((id, i) => {
        const link = document.getElementById(id)
        link.style.backgroundColor = filters_design[i][0]
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
                this.className = filters_design[i][1];
                this.style.backgroundColor = "#ccc";
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            } else {
                this.className = filters_design[i][1] + ' active';
                this.style.backgroundColor = filters_design[i][0];
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
            }
        };
    });
});

/////////////////////////////////
// Event handling: Add popups when user clicks layers
map.on('click', (e) => {
    const features = map.queryRenderedFeatures(e.point);
    if (features.length >= 1) {
        const id = features[0].layer.id
        if (id == parks_id) {
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
                            <td class="value">${features[0].properties.name311}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${features[0].properties.location}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == plazas_id) {
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
                            <td class="value">${features[0].properties.plazaname}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${features[0].properties.onstreet}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == restroom_id) {
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
                            <td class="value">${features[0].properties.Location}</td>
                        </tr>
                        <tr>
                            <td class="key">Open Year-Round</td>
                            <td class="value">${features[0].properties["Open Year-Round"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Handicap Accessible</td>
                            <td class="value">${features[0].properties["Handicap Accessible"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == seats_id) {
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
                            <td class="value">${features[0].properties["location"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == benches_id) {
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
                            <td class="value">${features[0].properties["address"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == fountains_id) {
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
                            <td class="value">${features[0].properties["signname"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Position</td>
                            <td class="value">${features[0].properties["position"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == linkNYC_id) {
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
                            <td class="value">${features[0].properties["Street Address"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Status</td>
                            <td class="value">${features[0].properties["Installation Status"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
        if (id == pops_id) {
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Type</td>
                            <td class="value">POPS</td>
                        </tr>
                        <tr>
                            <td class="key">Address</td>
                            <td class="value">${features[0].properties["building_address_with_zip"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Developer</td>
                            <td class="value">${features[0].properties["developer"]}</td>
                        </tr>
                        <tr>
                            <td class="key">Amneities</td>
                            <td class="value">${features[0].properties["amenities_required"]}</td>
                        </tr>
                    </table>
                    `)
                .addTo(map);
        }
    }
});