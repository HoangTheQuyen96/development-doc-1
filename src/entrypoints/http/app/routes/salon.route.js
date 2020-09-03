const express = require('express');
const router = express.Router();

const validator = require('../../middlewares/validator');
const schema = require('../../schemas/salon.schema');
const handler = require('../handler');

router.post('/', validator(schema.createSalon), handler.createSalon);

module.exports = router;
