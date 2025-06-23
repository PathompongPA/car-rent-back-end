const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const BRAND = sequelize.define("brands", {
    brandId: {
        type: DataTypes.STRING(),
        primaryKey: true
    },
    brandImg: {
        type: DataTypes.STRING(),
    }
})

module.exports = {
    BRAND
};
