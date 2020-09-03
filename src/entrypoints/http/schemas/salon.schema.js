const createSalon = {
  type: 'object',
  required: ['email', 'phoneNumber', 'businessName'],
  properties: {
    email: { type: 'string', format: 'email' },
    phoneNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 11,
      pattern: '^[0-9]+$',
    },
    businessName: {
      type: 'string',
      maxLength: 50,
      minLength: 2,
    },
  },
};

module.exports = {
  createSalon,
};
