# wiki2Json
Collect and merge drinking fountains from wikidata and OpenStreetMap

## Demo
A working version of the code can be found here: [link](demo)

## Build open2json
- install NodeJS
- clone this repo
- in the directory that the code was cloned into, run `npm install` in the command line
- to build the module, run `npm run build`. This transpiles the TypeScript to Javascript (output into `/lib` directory) and packages the module for loading into a module (output into `/dist` directory)

## Other commands
- **test the code**: run `npm run test`
- **increment the package version**: run `npm run version [patch | minor | major]`
- **publish to npm**: run `npm run publish`
