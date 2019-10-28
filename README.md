# open2json
Collect and merge drinking fountains from wikidata and OpenStreetMap

## Demo
A working version of the code can be found here: [link](https://mmmatthew.github.io/open2json/demo)

# Using open2json in your project

## Using open2json in a front-end project
If your code runs in the browser without transpiling, then include the prepackaged code in your HTML head:

`<script src='https://github.com/mmmatthew/open2json/dist/open2json.min.js'></script>`

You can then obtain data asynchronously:

```
<script>
    bbox = {
        lonMin: 8.10,
        latMin: 45.51,
        lonMax: 8.15,
        latMax: 45.52
    };

    // create provider
    let provider = new open2json.Provider();

    // perform query (on osm and wikidata simultaneously. results are conflated to gether.)
    provider.query(['wikidata', 'osm'], bbox)
    .then(data => {
        // do something with the data (it is a geojson)
    })
    .catch(error => {
        // if an error occurs you can do something with it here.
    })
```

## Using open2json via npm install
```
> npm install --save open2json
```

You can then use open2json in your code:
```
var o2j = require('open2json');

// the rest is the same as the example above
```

## Read the docs
Find the docs here: [link](https://mmmatthew.github.io/open2json/dist/docs)

# For contributors

## Build open2json
- install NodeJS
- clone this repo
- in the directory that the code was cloned into, run `npm install` in the command line
- to build the module, run `npm run build`. This transpiles the TypeScript to Javascript (output into `/lib` directory) and packages the module for loading into a module (output into `/dist/webpack` directory). Additionally, the documentation is generated in the `dist/docs` directory.

## Other commands
- **test the code**: run `npm run test`
- **increment the package version**: run `npm run version [patch | minor | major]`
- **publish to npm**: run `npm run publish`
