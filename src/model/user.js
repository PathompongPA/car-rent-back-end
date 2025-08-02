const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const USER = sequelize.define("user", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    userName: {
        type: DataTypes.STRING(),
        unique: true
    },
    password: {
        type: DataTypes.STRING()
    },
    last_login: {
        type: DataTypes.DATE(),
        // defaultValue: DataTypes.DATE()
    }
})

module.exports = {
    USER
}