const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const BOOKING = sequelize.define("booking", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    checkInDate: {
        type: DataTypes.DATEONLY(),
    },
    checkOutDate: {
        type: DataTypes.DATEONLY()
    },
    isDelete: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }
})

module.exports = { BOOKING }