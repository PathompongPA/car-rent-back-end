const { DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("./init.model");

const BRAND = sequelize.define("brands", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: UUIDV4()
    },
    index: {
        type: DataTypes.INTEGER(),
        defaultValue: 99,
    },
    brandName: {
        type: DataTypes.STRING(),
        unique: true
    },
    brandImg: {
        type: DataTypes.STRING(),
    },
    isDelete: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }
})

module.exports = {
    BRAND
};
