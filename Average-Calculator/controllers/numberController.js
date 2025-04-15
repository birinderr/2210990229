const fetchNumbers = require('../services/numberService');
const windowModel = require('../models/windowModel');

exports.handleNumbersRequest = async (req, res) => {
  const { numberid } = req.params;

  try {
    const numbers = await fetchNumbers(numberid);
    const result = windowModel.add(numbers);

    res.json({
      windowPrevState: result.prevState,
      windowCurrState: result.currState,
      avg: result.avg
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
