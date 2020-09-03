const Ajv = require('ajv');
const createError = require('http-errors');

const validator = schema => async (req, res, next) => {
  try {
    const ajv = new Ajv({
      removeAdditional: true,
      useDefaults: true,
      coerceTypes: true,
      allErrors: true,
      verbose: true,
      errorDataPath: 'property',
    });

    const valid = ajv
      .addSchema(schema, 'bodySchema')
      .validate('bodySchema', req.body);

    if (!valid) {
      throw createError(422, 'validation error', {
        errors: ajv.errors.map(err => ({
          code: 422,
          message: `${err.dataPath.slice(1)} ${err.message}`,
        })),
      });
    }

    await next();
  } catch (error) {
    res.status(422).json(error);
  }
};

module.exports = validator;
