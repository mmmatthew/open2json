import { ProviderOptions } from "./types";

// Default query options
export const defaultOptions:ProviderOptions = {
    overpassTagFilters: [
        // see https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Tag_request_clauses_.28or_.22tag_filters.22.29
        'amenity=drinking_water',
        'drinking_water=yes'
    ],
    overpassUrl: 'https://z.overpass-api.de/api/interpreter',
    wdLangs: "en,de,fr,it,es",
    wdEntityClasses: [
        'Q1630622',  // drinking water fountain (Q1630622)
        'Q483453', // fountain (Q483453)
        'Q43483'  // water well (Q43483)
    ],
    wdImageWidth: 350, // width in pixels of image to return
    conflateRadius: 10 // search radius for fountains
};