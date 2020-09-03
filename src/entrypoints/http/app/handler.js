const createSalonInteract = require('../../../controllers/salon/create-salon/interactor');

module.exports = {
  createSalon: async (req, res) => {
    try {
      const { businessName, phoneNumber, email } = req.body;

      const result = await createSalonInteract({
        businessName,
        phoneNumber,
        email,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: 'asjndsjan' });
    }
  },
};
