const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CAR = sequelize.define("cars", {
    carId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    carName: {
        type: DataTypes.STRING()
    },

    carDescription: {
        type: DataTypes.STRING(),
        defaultValue: "this is description demo"
    },
    pricePerDay: {
        type: DataTypes.INTEGER(),
        defaultValue: 4000
    },
    pricePerWeek: {
        type: DataTypes.INTEGER(),
        defaultValue: 3500
    },
    pricePerMonth: {
        type: DataTypes.INTEGER(),
        defaultValue: 3000
    }
})

module.exports = {
    CAR
}