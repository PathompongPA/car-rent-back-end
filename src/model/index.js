const { IMG } = require('./img');
const { CAR } = require('./car');
const { initSql, sequelize } = require('./init.model');
const { BRAND } = require('./brand');
const { OFFER } = require('./offer');
const { BOOKING } = require('./booking');
const { PAYMENT } = require('./payment');
const { CUSTOMER } = require('./customer');
const { TYPE } = require('./type');

BRAND.hasMany(CAR)
CAR.hasMany(IMG)
CAR.hasMany(OFFER)
CAR.hasMany(BOOKING)
CUSTOMER.hasMany(BOOKING)
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
    sequelize
}

module.exports = model