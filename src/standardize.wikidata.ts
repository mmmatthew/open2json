import { Feature, FeatureCollection } from 'geojson';
import * as md5 from 'md5';
import { getUrlFromMediaName } from './convert.wikimedia.strings';

/**
 * Create GeoJson from wikidata response json. This involves extracting the image and location data, and removing duplicates
 * @param res Response from wikidata query
 * @param imageWidth Width of the image thumbnails that should be returned
 */
export function standardizeWikidata(res: any, imageWidth: number = 300): FeatureCollection {
  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  // list of QIDs
  const qids: string[] = [];

  res.results.bindings.forEach((o: any) => {
    const qid = o.place.value.split('entity/')[1];
    // only add feature if the feature was not yet seen
    if (qids.indexOf(qid) < 0) {
      geojson.features.push(createFeature(o, imageWidth));
      qids.push(qid);
    }
  });

  return geojson;
}

function createFeature(obj: any, imageWidth: number): Feature {
  let mediaName;
  if (obj.image) {
    // if image is available, make path
    mediaName = 'File:' + obj.image.value.split('Path/')[1];
  }
  return {
    type: 'Feature',
    properties: {
      id_wikidata: obj.place.value.split('entity/')[1],
      image: mediaName,
      name: obj.placeLabel.value,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(
          obj.location.value
            .split(';')[0]
            .slice(6, -1)
            .split(' ')[0],
        ),
        parseFloat(
          obj.location.value
            .split(';')[0]
            .slice(6, -1)
            .split(' ')[1],
        ),
      ],
    },
  };
}
