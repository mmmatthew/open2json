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
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Ciudad_Banesco_%28entrada%29.jpg/245px-Ciudad_Banesco_%28entrada%29.jpg'
      },
      geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
    }]
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
          image: 'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg'
        },
        geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
      }]
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
          image: 'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg'
        },
        geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
      }]
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
          image: 'https://www.panorama.com.ve/__export/1526490432365/sites/panorama/img/2018/05/16/banco-mercantil.jpg_1746926620.jpg'
        },
        geometry: { type: 'Point', coordinates: [7.5875386, 47.5512434] },
      }]
    };