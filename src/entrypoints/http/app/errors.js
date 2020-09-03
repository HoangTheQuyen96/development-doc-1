const createError = require('http-errors');

module.exports = {
  Unauthorized: () =>
    createError(401, 'unauthorized', {
      errors: [{ code: 401, message: 'unauthorized' }],
    }),
  PermissionDenied: () =>
    createError(403, 'permission denied', {
      errors: [{ code: 403, message: 'permission denied' }],
    }),
  UserPostNotFound: () =>
    createError(404, 'user post not found', {
      errors: [{ code: 404, message: 'user post not found' }],
    }),
  UnexpectedError: () =>
    createError(500, 'unexpected error', {
      errors: [{ code: 500, message: 'unexpected error' }],
    }),
};
