export interface BoundingBox {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

export interface ProviderOptions {
  overpassTagFilters: string[],
  overpassUrl: string,
  wdLangs: string,
  wdEntityClasses: string[],
  wdImageWidth: number
}