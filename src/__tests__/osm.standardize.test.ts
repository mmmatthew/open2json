import { baselBoundingBox, osmGeoJson, osmGeoJsonNonWikiImage, osmGeoJsonWikiCategory, osmGeoJsonWikiFileImage, osmGeoJsonWikiImage } from '../resources';
import { standardizeOsm } from '../standardize.osm';

test('Standardize geojson', () => {
    const standardizedJson = standardizeOsm(osmGeoJson);
    expect(standardizedJson.features[0]).not.toHaveProperty('id');
    expect(standardizedJson.features[0].properties).toHaveProperty('id_osm');
    expect(standardizedJson.features[0].properties).toHaveProperty('name');
    expect(standardizedJson.features[0].properties).toHaveProperty('image');
  });
  
  test('Get correct file name from OSM geojson', () => {
    expect(standardizeOsm(osmGeoJsonNonWikiImage).features[0].properties!.image).toBeUndefined();
    expect(standardizeOsm(osmGeoJsonWikiImage).features[0].properties!.image).toMatch(/File:/);
    expect(standardizeOsm(osmGeoJsonWikiFileImage).features[0].properties!.image).toMatch(/File:/);
    expect(standardizeOsm(osmGeoJsonWikiCategory).features[0].properties!.image).toBeUndefined();
  });