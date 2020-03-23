/**
 * Get query parameter value from the URL (window.location.href)
 * @name getURLParams
 * @param {string} name - paramenter from which we want to get value
 * @returns {string} returns value of query parameter or empty string if parameter doesn't exist inside URL
 * @example
 *  getURLParams('id') // => ''
 */
export const getURLParams = (paramName: string): string => {
  paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexS = '[\\?&]' + paramName + '=([^&#]*)';
  const regex = new RegExp(regexS);
  const results = regex.exec(window.location.href);
  return results === null ? '' : results[1];
};

export default {
  getURLParams,
};
