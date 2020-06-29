/**
 * Regular Expression for validations
 */
module.exports = {
  objectId: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im,
};
