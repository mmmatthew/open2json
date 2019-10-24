import { FeatureCollection } from 'geojson';
import * as query_overpass from 'query-overpass';
import { defaultOptions } from './defaults';
import { BoundingBox } from './types';

/**
 * Function to query OSM with a bounding box and return simplified geojson object
 */
export function queryOsm(bbox: BoundingBox, options = defaultOptions): (Promise<FeatureCollection>) {

    // update options just in case passed options do not contain all necessary params
    options = Object.assign(defaultOptions, options);

    return new Promise((resolve, reject) => {
        // create query for overpass
        const queryString = buildOsmQueryString(bbox, options.overpassTagFilters);

        // run query with overpass. See https://github.com/perliedman/query-overpass
        query_overpass(
            queryString,
            (error: Error, data: FeatureCollection) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            },
            {
                overpassUrl: options.overpassUrl,
                flatProperties: true
            },
        );
    });
}

export function buildOsmQueryString(bbox: BoundingBox, tagFilters: string[]) {
    const queryString = `[out:json];(${tagFilters
        .map(tagFilter => `node[${tagFilter}](${bbox.latMin},${bbox.lonMin},${bbox.latMax},${bbox.lonMax});`)
        .join('')});out;`;
    return queryString;
}
