import { stringLiteral } from '@babel/types';
import { FeatureCollection } from 'geojson';

/**
 * standardize into simple geoJson format. Unavailable values are undefined
 * @param data data returned by OpenStreetMap overpass API
 */
export function standardizeOsm(data: FeatureCollection): FeatureCollection {
  // loop through features
  data.features.forEach(f => {
    // create a new property object and populate it with the existing data according to the "standard_properties"
    if (f.properties) {
      const newProps = {
        name: f.properties.name,
        id_osm: f.properties.id || f.id,
        id_wikidata: f.properties.wikidata,
        image: f.properties.image,
      };
      f.properties = newProps;
    }
    // delet the geojson "id" property to save space
    delete f.id;
  });

  // return data
  return data;
}
