import { Provider } from '../index';
import { baselBoundingBox, difficultArea } from '../resources';

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
      const qids:string[] = [];
      data.features.forEach(f=>{
        // check that there are no duplicates
        if(f.properties){
          expect(qids.indexOf(f.properties.id_wikidata)).toBeLessThan(0);
          qids.push(f.properties.id_wikidata);
        }
      })
    })
    .catch(error => {
      console.error(error);
    });
});

