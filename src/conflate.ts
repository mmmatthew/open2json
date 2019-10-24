import { FeatureCollection, Point } from "geojson";
import * as haversine from "haversine";
import { defaultOptions } from "./defaults";
import { ProviderOptions } from "./types";

/**
 * Conflate two GeoJson objects, preferring OpenStreetMap if there is a conflict
 * @param osmGeoJson GeoJson from OpenStreetMap
 * @param wikidataGeoJson GeoJson from Wikidata
 * @param options Provider Options
 */
export function conflate(osmGeoJson: FeatureCollection, wikidataGeoJson: FeatureCollection, options: ProviderOptions=defaultOptions): FeatureCollection {
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
            }
        })


    })

}

function matchByLocation(wikidataGeoJson: FeatureCollection, osmGeoJson: FeatureCollection, conflateRadius:number=defaultOptions.conflateRadius): void {

    // loop through wikidata and find matches for each
    wikidataGeoJson.features.forEach(fwiki => {
        const distances = osmGeoJson.features.map((fosm) => {
            // don't consider fountain if already matched
            if(!fosm.properties || (fosm.properties && (fosm.properties.matchedBy === 'id_wikidata'))){
                return 100
                // otherwise compute distance
            }else{
                return haversine((fosm.geometry as Point).coordinates, (fwiki.geometry as Point).coordinates, {
                    unit: 'meter',
                    format: '[lon,lat]'
                })
            }
        });
        // copy over data from nearest if nearer than set distance
        const index = indexOfSmallest(distances);
        const distance = distances[index];
        const fOsm = osmGeoJson.features[index];
        // copy data over, only if not null and if distance lower than set value
        if(fOsm.properties && fwiki.properties && (distance <= conflateRadius)){
            fOsm.properties.image = fwiki.properties.image || fOsm.properties.image;
            fOsm.properties.name = fwiki.properties.name || fOsm.properties.name;
            fOsm.properties.id_wikidata = fwiki.properties.id_wikidata;
            // document merging
            fOsm.properties.mergedOn = `coordinates: ${distance.toFixed(2)} m`;
            fwiki.properties.mergedOn = `coordinates: ${distance.toFixed(2)} m`;
        }

    })
}

function indexOfSmallest(a: number[]): number {
    let lowest = 0;
    for (let i = 1; i < a.length; i++) {
        if (a[i] < a[lowest]) { lowest = i; }
    }
    return lowest;
}