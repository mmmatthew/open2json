import { Provider } from '../index';
import { zuriBoundingBox } from '../resources';

test('Conflated data sets works', () => {
  const provider = new Provider();
  return provider
    .query(['wikidata', 'osm'], zuriBoundingBox)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
      if (data.features[0].properties) {
        expect(data.features[0].properties.id_wikidata).toBe('Q27229889');
      }
    })
    .catch(error => {
      console.error(error);
    });
});
