import Axios from 'axios';
import * as wdk from 'wikidata-sdk';
import { Provider } from '../index';
import { buildWikidataQueryString } from '../query.wikidata';
import { baselBoundingBox } from './resources';

test('Wikidata query returns geoJson', () => {
    const provider = new Provider();
    return provider
      .query(['wikidata'], baselBoundingBox)
      .then(data => {
          // console.log(JSON.stringify(data))
        expect(data).toHaveProperty('features');
      })
      .catch(error => {
          console.error(error)
        });
  });