import { FeatureCollection } from 'geojson';
import { baselBoundingBox } from './__tests__/resources';
import { queryOsm } from './query.osm';
import { standardizeOsm } from './standardize.osm';
import { BoundingBox } from './types';

export class Wiki2json {
  private options = {
    tag_filters: ['amenity=drinking_water'],
  };
  // constructor(){}
  /**
   *
   * @param sources list of strings (either 'wikidata' and/or 'osm') indicating which sources to use
   * @param bbox bounding box to query in
   * @param options options for queries
   */
  public query(sources: string[], bbox: BoundingBox, options = this.options): Promise<FeatureCollection> {
    if (sources.indexOf('osm') >= 0) {
      // if only osm is requested
      return queryOsm(bbox, options).then(data => standardizeOsm(data));
    } else {
      throw new Error(
        `Source string array not recognized (${JSON.stringify(sources)}). Use an array of "osm" and/or "wikidata"`,
      );
    }
  }
}

export const bbbox = baselBoundingBox;
