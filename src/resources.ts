import { FeatureCollection } from 'geojson';
import { BoundingBox } from './types';

export const baselBoundingBox: BoundingBox = {
  latMax: 47.7,
  latMin: 47.5,
  lonMax: 7.7,
  lonMin: 7.5,
};

export const zuriBoundingBox: BoundingBox = {
  latMax: 47.36852337512103,
  latMin: 47.363692917827215,
  lonMax: 8.539960384368896,
  lonMin: 8.535035848617554,
};

export const difficultArea = {
  latMin: 51,
  lonMin: 14,
  latMax: 55,
  lonMax: 15,
};

export const osmGeoJson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'node/567050952',
      properties: {
        name: 'Fischermädchen-Brunnen',
        id: 'node/567050952',
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    },
    {
      type: 'Feature',
      id: 'node/575614798',
      properties: {
        id: 'node/575614798',
      },
      geometry: { type: 'Point', coordinates: [7.5873847, 47.555435] },
    },
    {
      type: 'Feature',
      id: 'node/583590302',
      properties: {
        name: 'Augustiner-Brunnen',
        id: 'node/583590302',
      },
      geometry: { type: 'Point', coordinates: [7.59034, 47.5579655] },
    },
  ],
};

export const osmGeoJsonWikiImage: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'node/567050952',
      properties: {
        name: 'Fischermädchen-Brunnen',
        id: 'node/567050952',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ciudad_Banesco_%28entrada%29.jpg/245px-Ciudad_Banesco_%28entrada%29.jpg',
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    },
  ],
};

export const osmGeoJsonNonWikiImage: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'node/567050952',
      properties: {
        name: 'Fischermädchen-Brunnen',
        id: 'node/567050952',
        image:
          'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg',
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    },
  ],
};

export const osmGeoJsonWikiFileImage: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'node/567050952',
      properties: {
        name: 'Fischermädchen-Brunnen',
        id: 'node/567050952',
        wikimedia_commons: 'File:Sternplatz-tuebingen.jpg',
        image:
          'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg',
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    },
  ],
};

export const osmGeoJsonWikiCategory: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'node/567050952',
      properties: {
        name: 'Fischermädchen-Brunnen',
        id: 'node/567050952',
        wikimedia_commons: 'Category:City_walls_of_Erlangen',
        image:
          'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg',
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    },
  ],
};

export const standardOsmGeoJson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Froschbrunnen',
        id_osm: 'node/201499848',
      },
      geometry: {
        type: 'Point',
        coordinates: [8.0518839, 47.386667],
      },
    },
    {
      type: 'Feature',
      properties: {
        id_osm: 'node/260353812',
      },
      geometry: {
        type: 'Point',
        coordinates: [8.1844675, 47.350443],
      },
    },
    {
      type: 'Feature',
      properties: {
        id_osm: 'node/260353813',
      },
      geometry: {
        type: 'Point',
        coordinates: [8.1863668, 47.3499435],
      },
    },
    {
      type: 'Feature',
      properties: {
        id_osm: 'node/260353814',
      },
      geometry: {
        type: 'Point',
        coordinates: [8.1847468, 47.3611431],
      },
    },
  ],
};

export const standardWikiGeoJson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id_wikidata: 'Q22952244',
        ispotable: 'true',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bourogne%2C_Lavoir_du_corps_de_garde.jpg/300px-Bourogne%2C_Lavoir_du_corps_de_garde.jpg',
        name: 'fontaine-lavoir du corps de garde',
      },
      geometry: {
        type: 'Point',
        coordinates: [6.919, 47.5613],
      },
    },
    {
      type: 'Feature',
      properties: {
        id_wikidata: 'Q56570011',
        ispotable: 'true',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Schwanengasse-Brunnen_(Schwan_-_Heinz_Schwarz_1956)_05.jpg/300px-Schwanengasse-Brunnen_(Schwan_-_Heinz_Schwarz_1956)_05.jpg',
        name: 'Schwanengasse fountain',
      },
      geometry: {
        type: 'Point',
        coordinates: [7.4391, 46.9463],
      },
    },
    {
      type: 'Feature',
      properties: {
        id_wikidata: 'Q56721751',
        ispotable: 'false',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Zwillingsbrunnen_Bundeshaus_03.jpg/300px-Zwillingsbrunnen_Bundeshaus_03.jpg',
        name: 'twin fountains Federal Palace',
      },
      geometry: {
        type: 'Point',
        coordinates: [7.44432, 46.94638],
      },
    },
  ],
};
