const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const BOOKING = sequelize.define("booking", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    checkInDate: {
        type: DataTypes.DATE(),
    },
    checkOutDate: {
        type: DataTypes.DATE()
    },
    isDelete: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }
})

module.exports = { BOOKING }