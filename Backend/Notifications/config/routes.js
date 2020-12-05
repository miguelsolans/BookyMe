const express = require('express');
const app = express.Router();

// Index Route
app.use('/', require('../app/routes/api/index'));
app.use('/user', require('../app/routes/api/user'));

module.exports = app;