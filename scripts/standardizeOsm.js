
var fs = require('fs');
var standardizeOsm = require('../lib/src/standardize.osm')
let filename = "C:/Users/moydevma/Downloads/export.geojson";
fs.readFile('scripts/CH1_osm.json', 'utf8', (err, dataraw) => {
    // parse string into json object
    var dataParsed = JSON.parse(dataraw);
    // standardize data
    standardizedData = standardizeOsm.standardizeOsm(dataParsed);

    console.log(JSON.stringify(standardizedData.features[1]), null, 2)

    
    // write data to file
    fs.writeFile('scripts/CH1_osm_standardized.json', JSON.stringify(standardizedData, null, 2), 'utf8', ()=>{console.log('written')});
})
