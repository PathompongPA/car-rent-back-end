const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CAR = sequelize.define("cars", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    carName: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false
    },

    carDescription: {
        type: DataTypes.TEXT("long"),
        defaultValue: "this is description demo"
    },
    carThumbnail: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    isDelete: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    },
    index: {
        type: DataTypes.INTEGER(),
        defaultValue: 255
    }
})

module.exports = {
    CAR
}