
var fs = require('fs');
var zlib = require('zlib');
var functions = require('../lib/src/conflate')

// read standardized wikidata
fs.readFile('scripts/CH1_wiki_standardized.json', 'utf8', (err, datarawWiki) => {
    // read standardized osm data
    fs.readFile('scripts/CH1_osm_standardized.json', 'utf8', (err, datarawOsm) => {

        // parse data
        var dataWiki = JSON.parse(datarawWiki);
        var dataOsm = JSON.parse(datarawOsm);

        // conflate data
        var conflated = functions.conflate(dataOsm, dataWiki);

    
    // write data to file
    fs.writeFile('scripts/CH1_conflated.json', JSON.stringify(conflated, null, 2), 'utf8', ()=>{console.log('written')});
    
    // write gzipped data to file
    zlib.gzip(JSON.stringify(conflated, null, 2),(error, result)=>{
        fs.writeFile('scripts/CH1_conflated.gzip', result, 'utf8', ()=>{console.log('written')});
    })


    });
});


