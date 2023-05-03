mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb3poZW4iLCJhIjoiY2xnNXFlMGkxMDF0YzNobjBzeDZ3dTRodyJ9.aEmIpsNVZeh27U2L1z7j_A';

const NYC_COORDINATES = [-73.98795036092295, 40.72391715135848]
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: NYC_COORDINATES, // starting position [lng, lat]
    zoom: 13, // starting zoom
    bearing: 0,
    pitch: 0
});

const parks_id = 'Parks'
const plazas_id = 'Pedestrian Plazas'
const restroom_id = "Public Restrooms"
const seats_id = "Street Seats"
const benches_id = "Benches"
const colors = [
    '#53C557',
    '#066121',
    '#9343C2',
    '#3541E3',
    '#35C3E3'
]


map.on('load', function () {

    const layers = [
        parks_id,
        plazas_id,
        restroom_id,
        seats_id,
        benches_id
    ];

    // // create legend
    // const legend = document.getElementById('legend');

    // layers.forEach((layer, i) => {
    //     const color = colors[i];
    //     const item = document.createElement('div');
    //     const key = document.createElement('span');
    //     key.className = 'legend-key';
    //     key.style.backgroundColor = color;

    //     const value = document.createElement('span');
    //     value.innerHTML = `${layer}`;
    //     item.appendChild(key);
    //     item.appendChild(value);
    //     legend.appendChild(item);
    // });

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
            'fill-color': '#53C557' // green

        }
    }, 'road-label-simple')

    map.on('click', parks_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Name</td>
                            <td class="value">${e.features[0].properties.name311}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties.location}</td>
                        </tr>
                        <tr>
                            <td class="key">Acres</td>
                            <td class="value">${e.features[0].properties.acres}</td>
                        </tr>
                        <tr>
                            <td class="key">Jurisdiction</td>
                            <td class="value">${e.features[0].properties.jurisdiction}</td>
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
            'fill-color': '#066121' //dark green

        }
    }, 'road-label-simple')

    map.on('click', plazas_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
                    <table class="key-value-table">
                        <tr>
                            <td class="key">Name</td>
                            <td class="value">${e.features[0].properties.plazaname}</td>
                        </tr>
                        <tr>
                            <td class="key">Location</td>
                            <td class="value">${e.features[0].properties.onstreet}</td>
                        </tr>
                        <tr>
                            <td class="key">Partner</td>
                            <td class="value">${e.features[0].properties.partner}</td>
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
            'circle-color': '#9343C2', //purple
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
                            <td class="key">Name</td>
                            <td class="value">${e.features[0].properties.Name}</td>
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
            'circle-color': '#3541E3', //blue
            'circle-radius': 5,
            'circle-opacity': .8
        }
    });

    map.on('click', seats_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setText('street seat')
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
            'circle-color': '#35C3E3', //light blue
            'circle-radius': 5,
            'circle-opacity': .8
        }
    })

    map.on('click', benches_id, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setText('bench')
            .addTo(map);
    });

});


// Event handling: toggling layers and points
// ref: https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
map.on('idle', () => {

    // Enumerate ids of the layers.
    const toggleableLayerIds = [parks_id, plazas_id, seats_id, benches_id, restroom_id]

    // Set up the corresponding toggle button for each layer.
    toggleableLayerIds.forEach((id, i) => {
        // Skip layers that already have a button set up.
        if (!document.getElementById(id)) {
            // Create a link.
            const link = document.createElement('a')
            link.id = id;
            link.href = '#';
            link.textContent = id;
            link.className = 'active';
            link.style.backgroundColor = colors[i]
            map.setLayoutProperty(id, 'visibility', 'visible')


            // Show or hide layer when the toggle is clicked.
            link.onclick = function (e) {
                const clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();

                const visibility = map.getLayoutProperty(
                    clickedLayer,
                    'visibility'
                );

                // Toggle layer visibility by changing the layout object's visibility property.
                if (visibility === 'visible') {
                    this.className = '';
                    this.style.backgroundColor = "#ccc";
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    
                } else {
                    this.className = 'active';
                    this.style.backgroundColor = colors[i];
                    map.setLayoutProperty(
                        clickedLayer,
                        'visibility',
                        'visible'
                    );
                }
            };
            const layers = document.getElementById('menu');
            layers.appendChild(link);
        }
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
