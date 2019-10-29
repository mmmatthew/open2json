# open2json
Collect and merge drinking fountains from wikidata and OpenStreetMap

## Demo
A working version of the code can be found here: [link](https://mmmatthew.github.io/open2json/demo)


## Using open2json in a front-end project
If your code runs in the browser without transpiling, then include the prepackaged code in your HTML head:

```html
<script src='https://github.com/mmmatthew/open2json/dist/open2json.min.js'></script>
```

You can then obtain data asynchronously:

```html
<script>

    // create provider
    let provider = new open2json.Provider();

    // perform query (on osm and wikidata simultaneously. results are conflated to gether.)
    // calling without arguments uses default options and a bounding box for Basel, Switzerland
    provider.query()
    .then(data => {
        // do something with the data (it is a geojson)
    })
    .catch(error => {
        // if an error occurs you can do something with it here.
    })

</script>
```

## Using open2json via npm install
```
> npm install --save open2json
```

You can then use open2json in your code:
```js
var open2json = require('open2json');

// define options to use everywhere
var options = {};

let provider = new open2json.Provider(options); // etc.
```
## Options
The query function takes an optional `options` argument with the following default values:
- **overpassTagFilters** (array of strings): Array of tag filters for querying OSM as defined [here](https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29).
- **overpassUrl** (string): Url root for overpass. There are several defined [here](https://wiki.openstreetmap.org/wiki/Platform_Status)
- **wdLangs** (string): List of language codes to be used for obtaining object label from Wikidata, in order of preference.
- **wdEntityClasses** (array of strings): Array of Wikidata entity IDs for filtering results
- **wdImageWidth** (integer): width of image for which a url is to be provided
- **conflateRadius** (integer): Wikidata objects are matched with the closest OpenStreetMap object that is within this distance (in meters)

The default values for these options are defined as follows:
```js
const defaultOptions = {   
  overpassTagFilters: [
    'amenity=drinking_water',
    'drinking_water=yes',
  ],
  overpassUrl: 'https://z.overpass-api.de/api/interpreter',
  wdLangs: 'en,de,fr,it,es',
  wdEntityClasses: [
    'Q1630622', // drinking water fountain (Q1630622)
    'Q483453', // fountain (Q483453)
    'Q43483', // water well (Q43483)
  ],
  wdImageWidth: 350, // width in pixels of image to return (just url)
  conflateRadius: 10, // search radius for fountains, in meters
}
``` 

## Using unit functions
```js
var open2json = require('open2json')

var bbox = {
    lonMin: 8.53,
    latMin: 47.37,
    lonMax: 8.55,
    latMax: 47.38
};

var options = {
    overpassTagFilters: [
    'drinking_water=yes'
  ]
};

var standardWikiGeoJson, standardOsmGeoJson;

// just get data from wikidata without any processing
open2json.queryWikidata(bbox, options).then(wikidataJson => {
    // standardize a typical Wikidata response
    standardWikiGeoJson = open2json.standardizeWikidata(wikidataJson);
})

// just get data from Osm without any processing
open2json.queryOsm(bbox, options).then(OsmJson => {
    // standardize a typical Osm response
    standardOsmGeoJson = open2json.standardizeOsm(OsmJson);
})

// conflate two standardized geojsons. This can only be run once both GeoJsons have been loaded
var conflated = open2json.conflate(standardOsmGeoJson, standardWikiGeoJson);

```

## Read the docs
Find the docs here: [link](https://mmmatthew.github.io/open2json/docs)

- query OpenStreetMap: [link](https://mmmatthew.github.io/open2json/docs/globals.html#queryosm)
- query Wikidata: [link](https://mmmatthew.github.io/open2json/docs/globals.html#querywikidata)
- standardize OpenStreetMap: [link](https://mmmatthew.github.io/open2json/docs/globals.html#standardizeosm)
- standardize Wikidata: [link](https://mmmatthew.github.io/open2json/docs/globals.html#standardizewikidata)
- conflate: [link](https://mmmatthew.github.io/open2json/docs/globals.html#conflate)
- do everything at once with the `query` method of Provider: [link](https://mmmatthew.github.io/open2json/docs/classes/provider.html)

# For contributors

## Build open2json
- install NodeJS
- clone this repo
- in the directory that the code was cloned into, run `npm install` in the command line
- to build the module, run `npm run build`. This transpiles the TypeScript to Javascript (output into `/lib` directory) and packages the module for loading into a module (output into `/dist/webpack` directory). Additionally, the documentation is generated in the `dist/docs` directory.

## Other commands
- **test the code**: run `npm run test`
- **increment the package version**: run `npm version [patch | minor | major]`
- **publish to npm**: run `npm run publish`
