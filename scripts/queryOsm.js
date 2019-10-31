
var importedFunctions = require('../lib/src/query.osm')
var fs = require('fs');

var bbox = {
    lonMin: 5.73486328125,
    latMin: 45.706179285330855,
    lonMax: 8.23974609375,
    latMax: 47.78363463526376
};

var options = {
    overpassTagFilters: [
    'drinking_water=yes',
    'amenity=drinking_water'
  ]
};

// callback to be run when the data arrives
function fun (OsmJson){

    // write data to file
    fs.writeFile('scripts/CH1_osm.json', JSON.stringify(OsmJson, null, 2), 'utf8', ()=>{console.log('written')});
}

// just get data from Osm without any processing
importedFunctions.queryOsm(bbox)
    .then(fun)
    .catch(error => {
    console.log(error);
});


// conflate two standardized geojsons. This can only be run once both GeoJsons have been loaded
// var conflated = open2json.conflate(standardOsmGeoJson, standardWikiGeoJson);