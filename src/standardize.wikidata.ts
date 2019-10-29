import { Feature, FeatureCollection } from 'geojson';
import * as md5 from 'md5';

/**
 * Create GeoJson from wikidata response
 * @param res Response from wikidata query
 * @param imageWidth Width of the image thumbnails that should be returned
 */
export function standardizeWikidata(res: any, imageWidth: number = 300): FeatureCollection {
  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  res.results.bindings.forEach((o: any) => {
    geojson.features.push(createFeature(o, imageWidth));
  });

  return geojson;
}

function createFeature(obj: any, imageWidth: number): Feature {
  return {
    type: 'Feature',
    properties: {
      id_wikidata: obj.place.value.split('entity/')[1],
      image: getFilePath(obj.images.value.split(';')[0].split('Path/')[1], imageWidth),
      name: obj.placeLabel.value,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(
          obj.locations.value
            .split(';')[0]
            .slice(6, -1)
            .split(' ')[0],
        ),
        parseFloat(
          obj.locations.value
            .split(';')[0]
            .slice(6, -1)
            .split(' ')[1],
        ),
      ],
    },
  };
}

// Function based on https://github.com/simon04/wikimedia-commons-file-path/blob/master/index.js because npm import was not working
// based on https://github.com/derhuerst/commons-photo-url/blob/master/index.js
/**
 *
 * @param file Filename, without "File:" or similar
 * @param width Width of returned image thumbnail, optional
 */
function getFilePath(file: string, width: number) {
  if (file === undefined) {
    return undefined;
  }
  // file = file.replace(/\s+/g, '_');
  const safe = sanitizeFilename(decodeURIComponent(file));
  const base = 'https://upload.wikimedia.org/wikipedia/commons';
  const hash = md5(decodeURIComponent(file).replace(/\s+/g, '_'));
  const ns = `${hash[0]}/${hash[0]}${hash[1]}`;
  if (width) {
    // thumbnail
    const suffix = file.match(/tiff?$/i) ? '.jpg' : file.match(/svg$/i) ? '.png' : '';
    return `${base}/thumb/${ns}/${safe}/${width}px-${safe}${suffix}`;
  } else {
    // original
    return `${base}/${ns}/${safe}`;
  }
}

// from https://github.com/water-fountains/datablue/blob/develop/server/api/services/wikimedia.service.js
function sanitizeFilename(filename: string) {
  // this doesn't cover all situations, but the following doesn't work either
  // return encodeURI(title.replace(/ /g, '_'));
  return (
    filename
      .replace(/\s+/g, '_')
      .replace(/,/g, '%2C')
      // .replace(/ü/g, '%C3%BC')
      .replace(/&/g, '%26')
  );
}