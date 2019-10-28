import Axios from 'axios';
import { FeatureCollection } from 'geojson';
import * as wdk from 'wikidata-sdk';
import { baselBoundingBox } from './__tests__/resources';
import { standardizeWikidata } from './standardize.wikidata';
import { defaultOptions } from './defaults';
import { BoundingBox, ProviderOptions } from './types';

/**
 * Function to query Wikidata with a bounding box and return simplified geojson object
 * @param bbox Bounding box
 * @param options Query options
 */
export function queryWikidata(
  bbox: BoundingBox,
  options: ProviderOptions = defaultOptions,
): Promise<FeatureCollection> {
  // update options just in case passed options do not contain all necessary params
  options = Object.assign(defaultOptions, options);
  bbox = Object.assign(baselBoundingBox, bbox);

  return new Promise((resolve, reject) => {
    // create query string for overpass
    const queryString = buildWikidataQueryString(bbox, options);

    // create url from query string
    const url = wdk.sparqlQuery(queryString);

    // run api query
    Axios.get(url).then(res => {
      if (res.status !== 200) {
        const error = new Error(`Request to Wikidata Failed. Status Code: ${res.status}. Data: ${res}. Url: ${url}`);
        return reject(error);
      } else {
        // If the data was returned from wikidata, then proceed by turning it into a geoJSON
        resolve(standardizeWikidata(res.data, options.wdImageWidth));
      }
    });
  });
}

/**
 * build query string for wikidata
 * @param bbox Bounding box in which to query
 * @param options query options
 */
export function buildWikidataQueryString(bbox: BoundingBox, options?: ProviderOptions) {
  options = Object.assign(defaultOptions, options);
  const queryString = `
    SELECT DISTINCT ?place ?placeLabel 
(group_concat(?image;separator=";") as ?images)
(group_concat(?location;separator=";") as ?locations)

WHERE
        {
          

          # The results of the spatial query are limited to instances or subclasses of entity classes
          FILTER (${options.wdEntityClasses.map(eC => `EXISTS { ?place wdt:P31/wdt:P279* wd:${eC} }`).join(' || ')}).
          
          SERVICE wikibase:box {
            # this service allows points within a box to be queried (https://en.wikibooks.org/wiki/SPARQL/SERVICE_-_around_and_box) 
            ?place wdt:P625 ?location .
            bd:serviceParam wikibase:cornerWest "Point(${bbox.lonMin} ${bbox.latMin})"^^geo:wktLiteral.
            bd:serviceParam wikibase:cornerEast "Point(${bbox.lonMax} ${bbox.latMax})"^^geo:wktLiteral.
          } .
          
          # the wikibase:label service allows the label to be returned easily. The list of languages provided are fallbacks: if no English label is available, use German etc.
          SERVICE wikibase:label {
            bd:serviceParam wikibase:language "${options.wdLangs}".
          }
          
          # It is important to place the OPTIONAL after the filters, otherwise the query times out
          OPTIONAL{ ?place wdt:P18 ?image. }
        }
groupby ?place ?placeLabel`;

  return queryString;
}
