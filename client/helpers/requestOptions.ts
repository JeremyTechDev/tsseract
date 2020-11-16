/**
 * This helper is used to created the object for made a request to the server.
 *
 * @param {Object} data - The data that will be put it on the body of the request.
 * @param {string} method - A string that contains the method to be executed.
 * @return {Object} A object that contain all the parameters to make a request to a server.
 */

type methodType = 'POST' | 'GET' | 'PUT' | 'DELETE';

const requestOptions = (data: object, method?: methodType): RequestInit => ({
  method: method || 'POST',
  headers: { 'Content-Type': 'application/json' },
  ...(method !== 'GET' && { body: JSON.stringify(data) }),
});

export default requestOptions;
