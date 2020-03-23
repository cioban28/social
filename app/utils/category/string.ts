/**
 * get initials from string(full name)
 * @name getInitials
 * @param {string} name - name to get initials
 * @returns {string} two first letters from 2 words for english and 1 for non-english
 * @example
 * getInitials('Gomer Simpson') // => GS
 * getInitials('Ð“Ð¾Ð¼ÐµÑ€ Ð¡Ð¸Ð¼Ð¿ÑÐ¾Ð½') // => Ð“
 * getInitials('Gomer') // => G
 */
export function getInitials(name: string): string {
  const nameArr = name.split(' ').slice(0, 2);
  const formatted = nameArr.map((word) => word[0]).join('');
  // display only one letter for non-english because sybols might be wider than expected
  if (!formatted.match(/[a-zA-z1-9]/)) {
    return formatted[0].toUpperCase();
  }
  return formatted.toUpperCase();
}

/**
 * @name
 * Generate hash code from string.
 * Used to generate hash to send comment and prevent much comments sending from some program etc.
 * so hash will be different for every sendComment API request or other requests using this
 * @returns {number}
 */
export function generateHashForServer(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // tslint:disable-next-line
    hash = ~~((hash << 5) - hash + str.charCodeAt(i)); // eslint-disable-line
  }
  return hash;
}

export function getParameterByName(name: string, url: string) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function convertLongNumber(num: number) {
  let res;
  if (num > 1000000) {
    res = `${(num / 1000000).toFixed(1)}M`;
  } else if (num > 1000) {
    res = `${(num / 1000).toFixed(1)}K`;
  } else {
    res = num;
  }
  return res;
}

export const countReactions = (arr: number[]) => arr.reduce((a, b) => a + b);

export default {
  generateHashForServer,
  getInitials,
  getParameterByName,
};
