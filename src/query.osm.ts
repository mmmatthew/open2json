import { privateName } from '@babel/types';
import { FeatureCollection } from 'geojson';
import * as query_overpass from 'query-overpass';
import { BoundingBox } from './types';

/**
 * Function to query OSM with a bounding box and return simplified geojson object
 */

// Default query options
const defaultOsmQueryOptions = {
  tag_filters: [
    // see https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29
    '"amenity"="drinking_water"',
  ],
};

export function queryOsm(bbox: BoundingBox, options = defaultOsmQueryOptions): Promise<FeatureCollection> {
  return new Promise((resolve, reject) => {
    // create query for overpass
    const query = buildOsmQuery(bbox, options.tag_filters);

    // run query. See https://github.com/perliedman/query-overpass
    query_overpass(
      query,
      (error: Error, data: FeatureCollection) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      },
      { flatProperties: true },
    );
  });
}

export function buildOsmQuery(bbox: BoundingBox, tagFilters: string[]) {
  const query = `[out:json];(${tagFilters
    .map(tagFilter => `node[${tagFilter}](${bbox.latMin},${bbox.lonMin},${bbox.latMax},${bbox.lonMax});`)
    .join('')});out;`;
  return query;
}
