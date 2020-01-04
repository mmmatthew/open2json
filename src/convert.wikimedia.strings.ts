import * as md5 from 'md5';

// Function based on https://github.com/simon04/wikimedia-commons-file-path/blob/master/index.js because npm import was not working
// based on https://github.com/derhuerst/commons-photo-url/blob/master/index.js
/**
 *
 * @param mediaName Filename, without "File:" or similar
 * @param width Width of returned image thumbnail, optional
 */
export function getUrlFromMediaName(mediaName: string, width: number) {
  if (mediaName === undefined) {
    return undefined;
  }
  // file = file.replace(/\s+/g, '_');
  const safe = sanitizeFilename(decodeURIComponent(mediaName));
  const base = 'https://upload.wikimedia.org/wikipedia/commons';
  const hash = md5(decodeURIComponent(mediaName).replace(/\s+/g, '_'));
  const ns = `${hash[0]}/${hash[0]}${hash[1]}`;
  if (width) {
    // thumbnail
    const suffix = mediaName.match(/tiff?$/i) ? '.jpg' : mediaName.match(/svg$/i) ? '.png' : '';
    return `${base}/thumb/${ns}/${safe}/${width}px-${safe}${suffix}`;
  } else {
    // original
    return `${base}/${ns}/${safe}`;
  }
}

/**
 * Function to obtain Wikimedia Commons media file name from URL
 * @param url URL of media file
 */

export function getMediaNameFromUrl(url: string) {
  if (url === undefined) {
    return undefined;
  }

  const safe = url.split('/').pop() as string;
  const mediaName = 'File:' + encodeURIComponent(unsanitizeFilename(safe));
  return mediaName;
}

// from https://github.com/water-fountains/datablue/blob/develop/server/api/services/wikimedia.service.js
function sanitizeFilename(filename: string) {
  // this doesn't cover all situations, but the following doesn't work either
  // return encodeURI(title.replace(/ /g, '_'));
  return (
    filename
      .replace(/\s+/g, '_')
      .replace(/,/g, '%2C')
      // .replace(/ü/g, '%C3%BC')
      .replace(/&/g, '%26')
  );
}

function unsanitizeFilename(mediaName: string) {
  return mediaName
    .replace(/_/g, ' ')
    .replace(/%2C/g, ',')
    .replace(/%26/g, '&');
}
