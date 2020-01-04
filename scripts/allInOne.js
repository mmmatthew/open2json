var open2json = require('../lib/src');
var fs = require('fs');

// define options to use everywhere
// var options = {};

let provider = new open2json.Provider(); // etc.

const bbox = {
    latMin: 47,
    lonMin: 8,
    latMax: 48,
    lonMax: 9
}

const baselBoundingBox = {
    latMax: 47.7,
    latMin: 47.5,
    lonMax: 7.7,
    lonMin: 7.5,
  };

provider.query(['wikidata', 'osm'], bbox).then(data=>{
    fs.writeFile('scripts/allinone.json', JSON.stringify(data, null, 2), (err)=>{
        if(err) console.error(err);
        console.info('done');
    })
})