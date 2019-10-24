import { Provider } from '../index';
import { buildOsmQueryString } from '../query.osm';
import { standardizeOsm } from '../standardize.osm';
import { baselBoundingBox, osmGeoJson } from './resources';

test('Build OSM query', () => {
  expect(buildOsmQueryString(baselBoundingBox, ['amenity=drinking_water'])).toBe(
    '[out:json];(node[amenity=drinking_water](47.5,7.5,47.7,7.7););out;',
  );
});

test('Osm query returns geoJson', () => {
  let provider = new Provider();
  return provider
    .query(['osm'])
    .then(data => {
      expect(data).toHaveProperty('features');
    })
    .catch(error => console.error(error));
});

test('Standardize geojson', () => {
  let standardizedJson = standardizeOsm(osmGeoJson);
  expect(standardizedJson.features[0]).not.toHaveProperty('id');
  expect(standardizedJson.features[0].properties).toHaveProperty('id_osm');
  expect(standardizedJson.features[0].properties).toHaveProperty('name');
  expect(standardizedJson.features[0].properties).toHaveProperty('image');
});
