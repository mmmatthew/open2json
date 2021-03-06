import { Provider } from '../index';
import { buildOsmQueryString } from '../query.osm';
import { baselBoundingBox } from '../resources';

jest.setTimeout(30000);

test('Build OSM query', () => {
  expect(buildOsmQueryString(baselBoundingBox, ['amenity=drinking_water'], 30)).toBe(
    '[timeout:30][out:json];(node[amenity=drinking_water](47.5,7.5,47.7,7.7););out;',
  );
});

test('Osm query returns geoJson', () => {
  const provider = new Provider();
  return provider
    .query(['osm'], undefined, { overpassTimeout: 30 })
    .then(data => {
      expect(data).toHaveProperty('features');
    })
    .catch(error => console.log(error));
});
