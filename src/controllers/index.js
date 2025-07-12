const booking = require("./booking.controller");
const brand = require("./brand.controller");
const car = require("./car.controller");
const customer = require("./customer.controller");
const controller = {
    car,
    brand,
    customer,
    booking

}
module.exports = controller