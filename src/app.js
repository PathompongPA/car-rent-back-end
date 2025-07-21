const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser')

const app = express();
const cors = require('cors');
const router = require('./routers');
const middleware = require('./middlewares');
const uploadsPath = path.resolve(__dirname, '../uploads');

app.use(cookieParser())
app.use(middleware.responseHelper)
app.use(cors())
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use("/", router.v1)
app.use('/uploads', express.static(uploadsPath));

module.exports = { app }