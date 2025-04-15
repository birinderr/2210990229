const express = require('express');
const app = express();
const numbersRoute = require('./routes/numbersRoute');

app.use(express.json());
app.use('/numbers', numbersRoute);

module.exports = app;
