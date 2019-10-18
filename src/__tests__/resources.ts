import { FeatureCollection } from 'geojson';
import { BoundingBox } from '../types';

export const baselBoundingBox: BoundingBox = {
  latMax: 47.60477416894759,
  latMin: 47.517200697839414,
  lonMax: 7.676696777343749,
  lonMin: 7.544174194335937,
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
