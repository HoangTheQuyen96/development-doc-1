module.exports = async (error, req, res, next) => {
  res.status(error.status || 500).json({
    errors: [{ code: 500, message: 'unexpected error' }],
  });

  await next();
};
