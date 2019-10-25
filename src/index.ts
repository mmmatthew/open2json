import { FeatureCollection } from 'geojson';
import * as _ from 'lodash';
import { baselBoundingBox } from './__tests__/resources';
import { conflate } from './conflate';
import { defaultOptions } from './defaults';
import { queryOsm } from './query.osm';
import { queryWikidata } from './query.wikidata';
import { standardizeOsm } from './standardize.osm';
import { BoundingBox } from './types';

export class Provider {
  private options = defaultOptions;
  private bbox = baselBoundingBox;
  private sources = ['osm'];

  constructor(options?: any) {
    // update options with passed argument
    this.options = Object.assign(this.options, options);
  }
  /**
   *
   * @param sources list of strings (either 'wikidata' and/or 'osm') indicating which sources to use
   * @param bbox bounding box to query in
   * @param options options for queries
   */
  public query(sources?: string[], bbox?: BoundingBox, options?: any): Promise<FeatureCollection> {
    sources = sources ? sources : this.sources;
    bbox = Object.assign(this.bbox, bbox);
    options = Object.assign(this.options, options);

    // check that sources is valid
    if (sources.length === 0) {
      throw new Error('no sources defined');
    }
    if (sources.length > 2) {
      throw new Error('Too many sources defined. Maximum two allowed');
    }
    if (!sources.every(s => ['osm', 'wikidata'].indexOf(s) >= 0)) {
      throw new Error(`unknown source: ${sources}`);
    }

    // Array of promises that need to resolve before the data is returned
    const promises: Array<Promise<FeatureCollection>> = [];

    // if osm is requested
    if (sources.includes('osm')) {
      promises.push(queryOsm(bbox, options).then(data => standardizeOsm(data)));
    }

    // if wikidata is requested
    if (sources.includes('wikidata')) {
      promises.push(queryWikidata(bbox, options));
    }

    // when all promises are finished, conflate if more than one geojson was returned
    return (
      Promise.all(promises)
        .then(dropEmpty)
        .then(geoJsonArray => {
          // if array is empty
          if (geoJsonArray.length === 0) {
            throw new Error(`Array of GeoJsons returned by promises is empty.`);

            // if contains only one geoJson, then return it
          } else if (geoJsonArray.length === 1) {
            return geoJsonArray[0];

            // if neither are null, then conflate the two
          } else {
            // osm data is always first because of construction of promises array
            const [osmGeoJson, wikidataGeoJson] = geoJsonArray;
            return conflate(osmGeoJson, wikidataGeoJson);
          }
        })

        // throw an error if there is a problem
        .catch(err => {
          throw err;
        })
    );
  }
}

/**
 * Drop any geoJsons that have zero features
 * @param geoJsonArray
 */
function dropEmpty(geoJsonArray: FeatureCollection[]): FeatureCollection[] {
  const toRemove: number[] = [];

  // find objects to remove
  geoJsonArray.forEach((fc, i, array) => {
    if (fc.features.length === 0) {
      toRemove.push(i);
    }
  });

  // remove in reverse order
  toRemove.reverse().forEach(i => {
    geoJsonArray.slice(i, 1);
  });

  return geoJsonArray;
}
