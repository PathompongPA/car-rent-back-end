const express = require('express');
const car = require("./car.router");
const brand = require("./brand.router");
const customer = require('./customer.router');
const booking = require('./booking.router');
const v1 = express.Router()
v1.use("/api/car", car)
v1.use("/api/car/", brand)
v1.use("/api/customer/", customer)
v1.use("/api/booking", booking)

let router = {
    v1
}

module.exports = router