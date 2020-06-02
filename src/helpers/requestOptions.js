/**
 * Creates a object with the necessary options to make an API request
 * @param {Object} body Request body object
 * @param {String} method Request method option - POST by default
 * @param {Object} headers Request headers object
 * @returns {Object} with the necessary resquest options
 */
module.exports = (body, method, headers = {}) => {
  return {
    method: method || 'POST',
    body: body || {},
    headers: { 'Content-Type': 'application/json', ...headers },
  };
};
