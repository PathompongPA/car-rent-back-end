const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CUSTOMER = sequelize.define("user", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    userName: {
        type: DataTypes.STRING()
    },
    password: {
        type: DataTypes.STRING()
    },
    last_login: {
        type: DataTypes.DATE(),
        defaultValue: Date.now()
    }
})

module.exports = {
    CUSTOMER
}