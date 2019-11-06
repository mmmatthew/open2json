import { Provider } from '../index';
import { buildOsmQueryString } from '../query.osm';
import { baselBoundingBox, osmGeoJson, zuriBoundingBox } from '../resources';
import { standardizeOsm } from '../standardize.osm';

test('Build OSM query', () => {
  expect(buildOsmQueryString(baselBoundingBox, ['amenity=drinking_water'], 30)).toBe(
    '[timeout:30][out:json];(node[amenity=drinking_water](47.5,7.5,47.7,7.7););out;',
  );
});

test('Osm query returns geoJson', () => {
  const provider = new Provider();
  return provider
    .query(['osm'], undefined, {overpassTimeout:30})
    .then(data => {
      expect(data).toHaveProperty('features');
    })
    .catch(error => console.error(error));
});

test('Standardize geojson', () => {
  const standardizedJson = standardizeOsm(osmGeoJson);
  expect(standardizedJson.features[0]).not.toHaveProperty('id');
  expect(standardizedJson.features[0].properties).toHaveProperty('id_osm');
  expect(standardizedJson.features[0].properties).toHaveProperty('name');
  expect(standardizedJson.features[0].properties).toHaveProperty('image');
});
