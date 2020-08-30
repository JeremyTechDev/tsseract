/**
 * Checks if an image exists
 * @param {String} url - the image url
 * @returns {Boolean} - if the image exists or not
 */
export const imgExists = (url: string) => {
  const xhr = new XMLHttpRequest();

  xhr.open('HEAD', url, false);
  xhr.send();

  return xhr.status !== 404;
};
