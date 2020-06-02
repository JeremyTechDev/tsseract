module.exports = (body, method, headers = {}) => {
  return {
    method: method || 'POST',
    body: body || {},
    headers: { 'Content-Type': 'application/json', ...headers },
  };
};
