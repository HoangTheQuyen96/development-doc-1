module.exports = async (req, res, next) => {
  res.status(404).json({
    errors: [{ code: 404, message: 'resource not found' }],
  });

  await next();
};
