/** Object representing a bounding box */
export interface BoundingBox {
  /** latitude of bottom edge */
  latMin: number;
  /** latitude of top edge */
  latMax: number;
  /** longitude of left edge */
  lonMin: number;
  /** longitude of right edge */
  lonMax: number;
}

/** options that can be provided to Provider(), query(), and their main methods */
export interface ProviderOptions {
  /** Array of tag filters for OSM queries. Example: `["drinking_water=yes"]`. See [docs](https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29) */
  overpassTagFilters: string[];
  /** Url base for OSM queries. There are several defined [here](https://wiki.openstreetmap.org/wiki/Platform_Status) */
  overpassUrl: string;
  /** List of language codes to be used for obtaining object label from Wikidata, in order of preference. */
  wdLangs: string;
  /** Array of Wikidata entity IDs for filtering results */
  wdEntityClasses: string[];
  /** width of image for which a url is to be provided */
  wdImageWidth: number;
  /** Wikidata objects are matched with the closest OpenStreetMap object that is within this distance (in meters) */
  conflateRadius: number;
}