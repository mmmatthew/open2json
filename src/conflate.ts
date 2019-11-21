import { FeatureCollection, Point } from 'geojson';
import * as haversine from 'haversine';
import { defaultOptions } from './defaults';
import { ProviderOptions } from './types';

/**
 * Conflate two GeoJson objects, copying Wikidata information into matching OpenStreetMap objects.
 * Unmatched Wikidata objects are left out because the default wikidata query is broader than just drinking water fountains.
 * @param osmGeoJson GeoJson from OpenStreetMap, standardized.
 * @param wikidataGeoJson GeoJson from Wikidata, standardized.
 * @param options Provider Options (only the `conflateRadius` option is used)
 */
export function conflate(
  osmGeoJson: FeatureCollection,
  wikidataGeoJson: FeatureCollection,
  options: ProviderOptions = defaultOptions,
): FeatureCollection {
  // matching and property merging
  matchByQID(wikidataGeoJson, osmGeoJson);
  matchByLocation(wikidataGeoJson, osmGeoJson, options.conflateRadius);

  return osmGeoJson;
}

function matchByQID(wikidataGeoJson: FeatureCollection, osmGeoJson: FeatureCollection): void {
  // loop through wikidata and find matches for each
  wikidataGeoJson.features.forEach(fwiki => {
    osmGeoJson.features.forEach((fOsm, i) => {
      if (fOsm.properties && fwiki.properties && fOsm.properties.id_wikidata === fwiki.properties.id_wikidata) {
        // copy data over, only if not undefined
        fOsm.properties.image = fwiki.properties.image || fOsm.properties.image;
        fOsm.properties.name = fwiki.properties.name || fOsm.properties.name;
        // document merging
        fOsm.properties.mergedOn = 'id_wikidata';
        fwiki.properties.mergedOn = 'id_wikidata';

        // if OSM lists the fountain as drinking water but not wikidata, make a comment
        if (fwiki.properties.ispotable === 'false') {
          fOsm.properties.comments = ` Add instance of 'drinking fountain' to wikidata item ${fOsm.properties.id_wikidata} .`;
        }
      }
    });
  });
}

function matchByLocation(
  wikidataGeoJson: FeatureCollection,
  osmGeoJson: FeatureCollection,
  conflateRadius: number = defaultOptions.conflateRadius,
): void {
  // loop through wikidata and find matches for each
  wikidataGeoJson.features.forEach(fwiki => {
    const distances = osmGeoJson.features.map(fosm => {
      // don't consider fountain if already matched
      if (!fosm.properties || (fosm.properties && fosm.properties.mergedOn)) {
        return 100;
        // otherwise compute distance
      } else {
        return haversine((fosm.geometry as Point).coordinates, (fwiki.geometry as Point).coordinates, {
          unit: 'meter',
          format: '[lon,lat]',
        });
      }
    });
    // copy over data from nearest if nearer than set distance
    const index = indexOfSmallest(distances);
    if (index >= 0) {
      const distance = distances[index];
      const fOsm = osmGeoJson.features[index];

      // copy data over, only if not null and if distance lower than set value
      if (fOsm.properties && fwiki.properties && distance <= conflateRadius) {
        fOsm.properties.image = fwiki.properties.image || fOsm.properties.image;
        fOsm.properties.name = fwiki.properties.name || fOsm.properties.name;
        fOsm.properties.id_wikidata = fwiki.properties.id_wikidata;

        // document merging
        fOsm.properties.mergedOn = `coordinates: ${distance.toFixed(2)} m`;
        fwiki.properties.mergedOn = `coordinates: ${distance.toFixed(2)} m`;

        // if OSM lists the fountain as drinking water but not wikidata, make a comment
        if (fwiki.properties.ispotable === 'false') {
          fOsm.properties.comments = ` Add instance of "drinking fountain" to wikidata item ${fOsm.properties.id_wikidata} .`;
        }

        // if no match is found
      } else if (distance > conflateRadius && fwiki.properties && fwiki.properties.ispotable === true) {
        // delete unused properties
        delete fwiki.properties.ispotable;
        fwiki.properties.mergedOn = 'none';
        // copy whole fountain over
        osmGeoJson.features.push(JSON.parse(JSON.stringify(fwiki)));
      }
    } else if (fwiki.properties && fwiki.properties.ispotable === true) {
      // if no osm fountains exist
      // delete unused properties
      delete fwiki.properties.ispotable;
      fwiki.properties.mergedOn = 'none';
      // copy whole fountain over
      osmGeoJson.features.push(JSON.parse(JSON.stringify(fwiki)));
    }
  });
}

function indexOfSmallest(a: number[]): number {
  if (a.length === 0) {
    return -1;
  }

  let lowest = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) {
      lowest = i;
    }
  }
  return lowest;
}
