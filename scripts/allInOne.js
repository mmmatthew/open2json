var open2json = require('../lib/src');

// define options to use everywhere
// var options = {};

let provider = new open2json.Provider(); // etc.

let bbox = {
    latMin: 53,
    lonMin: 0,
    latMax: 56,
    lonMax: 3
}
provider.query(['wikidata', 'osm'], bbox).then(data=>{
    console.log(JSON.stringify(data, null, 2))
})