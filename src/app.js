const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const router = require('./routers');
const middleware = require('./middlewares');
const uploadsPath = path.resolve(__dirname, '../uploads');

const app = express();
app.use(cookieParser())
app.use(middleware.logging)
app.use(middleware.responseHelper)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router.v1)
app.use('/uploads', express.static(uploadsPath));

module.exports = { app }