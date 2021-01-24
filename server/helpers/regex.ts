/**
 * Regular Expression for validations
 */
export default {
  objectId: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  tag: /^[a-z0-9]+$/i,
};
