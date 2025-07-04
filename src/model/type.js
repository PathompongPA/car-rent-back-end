const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const TYPE = sequelize.define("types", {
    id: {
        type: DataTypes.STRING(),
        primaryKey: true,
    },
    paymentDescription: {
        type: DataTypes.STRING(),
    },
})

module.exports = {
    TYPE
};
