const booking = require("./booking.service")
const brand = require("./brand.service")
const car = require("./car.service")
const content = require("./content.service")
const customer = require("./customer.service")
const user = require("./user.service")

const services = {
    brand,
    car,
    customer,
    booking,
    content,
    user
}
module.exports = services
