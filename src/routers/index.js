const express = require('express');
const car = require("./car.router");
const brand = require("./brand.router");
const customer = require('./customer.router');
const booking = require('./booking.router');
const content = require('./content.router');
const user = require('./user.router');
const offer = require('./offer.router');

const v1 = express.Router()
v1.use("/car", car)
v1.use("/car/brand", brand)
v1.use("/customer", customer)
v1.use("/booking", booking)
v1.use("/content", content)
v1.use("/user", user)
v1.use("/offer", offer)

let router = {
    v1
}

module.exports = router