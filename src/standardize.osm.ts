import { stringLiteral } from '@babel/types';
import { FeatureCollection } from 'geojson';
import { getMediaNameFromUrl } from './convert.wikimedia.strings';

/**
 * standardize into simple geoJson format. Unavailable values are undefined
 * @param data data returned by OpenStreetMap overpass API
 */
export function standardizeOsm(data: FeatureCollection): FeatureCollection {
  // loop through features
  data.features.forEach(f => {
    // create a new property object and populate it with the existing data according to the "standard_properties"
    if (f.properties) {
      let mediaName = null;
      // only use image URL if the URL is from wikimedia commons
      if(f.properties.hasOwnProperty('image') && f.properties.image.includes('wikimedia.org')){
        mediaName = getMediaNameFromUrl(f.properties.image);
      // if there is a wikicommons name defined, use that (but only if it points to a  file, not a category)
      }else if(f.properties.hasOwnProperty('wikimedia_commons') && f.properties.wikimedia_commons.includes('File:')){
        // todo: get file url from file name
        mediaName = f.properties.wikimedia_commons;
      }
      const newProps = {
        name: f.properties.name,
        id_osm: f.properties.id || f.id,
        id_wikidata: f.properties.wikidata,
        image: mediaName,
        
      };
      f.properties = newProps;
    }
    // delet the geojson "id" property to save space
    delete f.id;
  });

  // return data
  return data;
}
