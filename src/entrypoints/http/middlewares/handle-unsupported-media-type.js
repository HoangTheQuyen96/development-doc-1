module.exports = async (req, res, next) => {
  if (
    req.method !== 'GET' &&
    !/application\/json/.test(req.headers['content-type'])
  ) {
    res.status(415).json({
      errors: [{ code: 415, message: 'unsupported media type' }],
    });
  } else {
    await next();
  }
};
