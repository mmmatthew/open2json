import { Wiki2json } from '../src/index';
import { baselBoundingBox } from '../src/__tests__/resources';


let provider = new Wiki2json();
console.log(provider.query(['osm'], baselBoundingBox));

