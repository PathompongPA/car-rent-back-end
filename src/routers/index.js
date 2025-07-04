const express = require('express');
const car = require("./car.router");
const brand = require("./brand.router");

const v1 = express.Router()
v1.use("/api/car", car)
v1.use("/api/car/", brand)

let router = {
    v1
}

module.exports = router