import { stringLiteral } from '@babel/types';
import { FeatureCollection } from 'geojson';

export function standardizeOsm(data: FeatureCollection): FeatureCollection {
  // loop through features
  data.features.forEach(f => {
    // delet the geojson "id" property
    delete f.id;

    // create a new property object and populate it with the existing data according to the "standard_properties"
    if (f.properties) {
      const newProps = {
        name: f.properties.name,
        id_osm: f.properties.id,
        id_wikidata: f.properties.wikidata,
        image: f.properties.image,
      };
      f.properties = newProps;
    }
  });

  // return data
  return data;
}
