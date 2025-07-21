const booking = require("./booking.controller");
const brand = require("./brand.controller");
const car = require("./car.controller");
const content = require("./content.controller");
const customer = require("./customer.controller");
const user = require("./user.controller");
const controller = {
    car,
    brand,
    customer,
    booking,
    content,
    user

}
module.exports = controller