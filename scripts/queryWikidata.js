
var importedFunctions = require('../lib/src/query.wikidata')
var fs = require('fs');

var bbox = {
    latMin: 51,
    lonMin: 14,
    latMax: 55,
    lonMax: 15
};

var options = {
    wdEntityClasses: [
        'Q1630622', // drinking water fountain (Q1630622)
        'Q483453', // fountain (Q483453)
        'Q43483', // water well (Q43483)
      ]
};


// just get data from Wikidata without any processing
importedFunctions.queryWikidata(bbox, options).then(WikidataJson => {
    console.log(JSON.stringify(WikidataJson));

    // write data to file
    fs.writeFile('scripts/CH1_wiki.json', JSON.stringify(WikidataJson, null, 2), 'utf8', ()=>{console.log('written')});
}).catch(error => {
    console.log(error);
})

