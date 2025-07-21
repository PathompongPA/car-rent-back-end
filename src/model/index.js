const { IMG } = require('./img');
const { CAR } = require('./car');
const { initSql, sequelize } = require('./init.model');
const { BRAND } = require('./brand');
const { OFFER } = require('./offer');
const { BOOKING } = require('./booking');
const { PAYMENT } = require('./payment');
const { CUSTOMER } = require('./customer');
const { TYPE } = require('./type');
const { CONTENT } = require('./content');

BRAND.hasMany(CAR)
CAR.belongsTo(BRAND)
CAR.hasMany(IMG)
CAR.hasMany(OFFER)
CAR.hasMany(BOOKING)
CUSTOMER.hasMany(BOOKING)
BOOKING.belongsTo(CAR)
BOOKING.belongsTo(CUSTOMER)
BOOKING.hasMany(PAYMENT)
TYPE.hasMany(PAYMENT)

let model = {
    BRAND,
    CAR,
    IMG,
    OFFER,
    BOOKING,
    CUSTOMER,
    PAYMENT,
    TYPE,
    initSql,
    sequelize,
    CONTENT

}

module.exports = model