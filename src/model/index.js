const { IMG } = require('./img');
const { CAR } = require('./car');
const { initSql, sequelize } = require('./init.model');
const { BRAND } = require('./brand');
const { OFFER } = require('./offer');
const { BOOKING } = require('./booking');
const { PAYMENT } = require('./payment');
const { CUSTOMER } = require('./customer');
const { TYPE } = require('./type');

BRAND.hasMany(CAR, { foreignKey: "brandId" })
CAR.hasMany(IMG, { foreignKey: true })
CAR.hasMany(OFFER)
CAR.hasMany(BOOKING)
CUSTOMER.hasMany(BOOKING)
BOOKING.hasMany(PAYMENT)
TYPE.hasMany(PAYMENT)


module.exports = {
    initSql,
    sequelize,
    BRAND,
    CAR,
    IMG,
    OFFER,
    BOOKING,
    CUSTOMER,
    PAYMENT,
    TYPE
}