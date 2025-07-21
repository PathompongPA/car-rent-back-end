const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CONTENT = sequelize.define("contents", {
    id: {
        type: DataTypes.STRING(),
        primaryKey: true,
    },
    value: {
        type: DataTypes.JSON(),
        allowNull: false,
    }
})

module.exports = {
    CONTENT
}
