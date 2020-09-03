const express = require('express');
const router = express.Router();

const salonRoute = require('./routes/salon.route');

router.use('/api/v1/salons', salonRoute);

module.exports = router;
