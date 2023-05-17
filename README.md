# Web Map: NYC Mobile Companion
## NYU GIS Spring 2023 Final Project

### Webmap: https://chlozhen.github.io/nyc-companion/

### Description
Webmap to locate essential needs! Find the closest: park, plaza, seat, restroom, water fountain, and Wi-Fi Kisok/charging stations. This is aimed at tourists, vistors, or resident hosts looking to find rest stops and services during a long day of exploring the city.

### NYC Data
All data was used at the time of download on May 17th, 2023 - data may have been updated since then.
* [Parks Data](https://nycopendata.socrata.com/Recreation/Parks-Properties/enfh-gkve)
* [Pedestrian Plazas](https://data.cityofnewyork.us/Transportation/NYC-DOT-Pedestrian-Plazas/k5k6-6jex)
* [Public Park Restrooms](https://data.cityofnewyork.us/Recreation/Directory-Of-Toilets-In-Public-Parks/hjae-yuav), [Automatic Public Toilets](https://data.cityofnewyork.us/dataset/Automatic-Public-Toilets/uzgy-xh4j)
* [Street Seats](https://data.cityofnewyork.us/Transportation/Street-Seats-2014-2019/d83i-6us7)
* [Benches](https://data.cityofnewyork.us/Transportation/City-Bench-Locations-Historical-/kuxa-tauh)
* [Park Water Fountains](https://data.cityofnewyork.us/Environment/NYC-Parks-Drinking-Fountains/622h-mkfu)
* [LinkNYC Kiosks](https://data.cityofnewyork.us/Social-Services/LinkNYC-Kiosk-Locations/s4kf-3yrf), more general info about [LinkNYC](https://www.link.nyc/)

For more NYC data, check out [NYC DOT Data Feeds](https://www.nyc.gov/html/dot/html/about/datafeeds.shtml), [NYC Open Data](https://opendata.cityofnewyork.us/)

### Code
* Adapted from Chris Whong's [tutorial](https://github.com/chriswhong/class-four-map/tree/main/data) for week 4 and Chloe Zheng's [week 4 project](https://github.com/chlozhen/webmap-nyc-outdoor-public-spaces)
* Using [Mapbox API](https://docs.mapbox.com/mapbox-gl-js/guides/) base and examples
* Major references/tools:
  * fontawesome for icons: https://fontawesome.com/
  * colorbrewer for color schemes: https://colorbrewer2.org/#type=sequential&scheme=BuGn&n=3
  * bootstrap for out-of-the-box objects: https://getbootstrap.com/
