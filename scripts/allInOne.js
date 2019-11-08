var open2json = require('../lib/src');
var fs = require('fs');

// define options to use everywhere
// var options = {};

let provider = new open2json.Provider(); // etc.

const bbox = {
    latMin: 51,
    lonMin: 14,
    latMax: 55,
    lonMax: 15
}
provider.query(['wikidata', 'osm'], bbox).then(data=>{
    fs.writeFile('allinone.json', JSON.stringify(data, null, 2), (err)=>{
        if(err) console.error(err);
        console.info('done');
    })
})