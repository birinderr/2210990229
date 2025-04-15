const express = require('express');
const router = express.Router();
const numbersController = require('../controllers/numberController');

router.get('/:numberid', numbersController.handleNumbersRequest);

module.exports = router;
