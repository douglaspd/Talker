const express = require('express');
const talkerRoute = require('./talkerRoutes');

const app = express();

app.use('/talker', talkerRoute);

app.use(express.json());

module.exports = app;
