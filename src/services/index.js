const booking = require("./booking.service")
const brand = require("./brand.service")
const car = require("./car.service")
const customer = require("./customer.service")

const services = {
    brand,
    car,
    customer,
    booking
}
module.exports = services
