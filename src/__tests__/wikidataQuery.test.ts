import { Provider } from '../index';
import { baselBoundingBox, difficultArea, zuriBoundingBox } from '../resources';

jest.setTimeout(30000);

test('Wikidata query returns geoJson', () => {
  const provider = new Provider();
  return provider
    .query(['wikidata'], baselBoundingBox)
    .then(data => {
      // console.log(JSON.stringify(data))
      expect(data).toHaveProperty('features');
    })
    .catch(error => {
      console.error(error);
    });
});

test('Wikidata query in difficult area does not give duplicates', () => {
  const provider = new Provider();
  return provider
    .query(['wikidata'], difficultArea)
    .then(data => {
      const qids: string[] = [];
      data.features.forEach(f => {
        // check that there are no duplicates
        if (f.properties) {
          expect(qids.indexOf(f.properties.id_wikidata)).toBeLessThan(0);
          qids.push(f.properties.id_wikidata);
        }
      });

      // check that there are more than one features returned
      expect(data.features.length).toBeGreaterThan(1);
    })
    .catch(error => {
      console.error(error);
    });
});

test('Wikidata query should not return demolished fountains', () => {
  const provider = new Provider();
  return provider
    .query(['wikidata'], zuriBoundingBox)
    .then(data => {
      const qids = data.features.map(f => {
        // check that the demolished fountains are not returned
        if (f.properties) {
          return f.properties.id_wikidata;
        }
      });

      // check that this demolished fountain is not returned in the results
      expect(qids.indexOf('Q55166053')).toBe(-1);
    })
    .catch(error => {
      console.error(error);
    });
});
