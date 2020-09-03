const dataGateway = require('../../../infrastructures/data-gateway/data-gateway');

module.exports = async ({ businessName, phoneNumber, email }) => {
  try {
    const result = await dataGateway.createSalon({
      businessName,
      phoneNumber,
      email,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
