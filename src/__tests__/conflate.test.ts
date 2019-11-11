import { conflate, Provider } from '../index';
import { osmGeoJson, standardOsmGeoJson, standardWikiGeoJson, zuriBoundingBox } from '../resources';

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
      // tslint:disable-next-line: no-console
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

test('Unmatched wikidata fountains should be copied over to empty osm', () => {
  const emptyGeoJson = JSON.parse(JSON.stringify(standardOsmGeoJson));
  emptyGeoJson.features = [];
  const wikiJson = JSON.parse(JSON.stringify(standardWikiGeoJson));

  const conflated = conflate(emptyGeoJson, wikiJson);

  expect(conflated.features.length).toBe(2);
});

test('Unmatched wikidata fountains should be copied over to osm with other locations', () => {
  const wikiJson = JSON.parse(JSON.stringify(standardWikiGeoJson));
  const osmJson = JSON.parse(JSON.stringify(standardOsmGeoJson));
  const conflated = conflate(osmJson, wikiJson);

  // there are no matches, so the two should be merged together
  expect(conflated.features.length).toBe(6);
});
