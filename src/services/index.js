const booking = require("./booking.service")
const brand = require("./brand.service")
const car = require("./car.app.service")
const content = require("./content.service")
const customer = require("./customer.service")
const offer = require("./offer.service")
const user = require("./user.service")

const services = {
    brand,
    car,
    customer,
    booking,
    content,
    user,
    offer
}
module.exports = services
