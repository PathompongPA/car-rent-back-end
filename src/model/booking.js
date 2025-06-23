const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const BOOKING = sequelize.define("booking", {
    bookingId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    checkInDate: {
        type: DataTypes.DATE(),
    },
    checkOutDate: {
        type: DataTypes.DATE()
    }
})

module.exports = { BOOKING }