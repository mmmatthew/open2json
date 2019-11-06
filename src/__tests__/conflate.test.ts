import { Provider, conflate } from '../index';
import { zuriBoundingBox, osmGeoJson } from '../resources';

jest.setTimeout(30000);

test('Conflated data sets works', () => {
  const provider = new Provider();
  return provider
    .query(['wikidata', 'osm'], zuriBoundingBox, { overpassTimeout: 30 })
    .then(data => {
      // console.log(JSON.stringify(data, null, 2));
      if (data.features[0].properties) {
        expect(data.features[0].properties.id_wikidata).toBe('Q27229889');
      }
    })
    .catch(error => {
      console.error(error);
    });
});

test('Conflation works even if the OSM FeatureCollection is an empty array', () => {
  const emptyGeoJson = JSON.parse(JSON.stringify(osmGeoJson));
  emptyGeoJson.features = [];
  const conflated = conflate(emptyGeoJson, osmGeoJson);

  expect(conflated.type).toBe('FeatureCollection');
  expect(conflated.features.length).toBe(0);
});
