const express = require('express');
const { carRouter } = require('./routers');
const app = express();

app.use("/car", carRouter)

module.exports = { app }