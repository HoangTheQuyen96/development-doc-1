const pgPrimary = require('../providers/pgPrimary');

module.exports = ({ businessName, phoneNumber, email }) =>
  pgPrimary.query({
    text: `INSERT INTO salons(business_name, operator_phone_number, "operator_email") VALUES ($1, $2, $3) RETURNING *`,
    values: [businessName, phoneNumber, email],
  });
