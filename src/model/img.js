const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const IMG = sequelize.define('Img', {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    name: {
        type: DataTypes.STRING(100),
    },
    index: {
        type: DataTypes.INTEGER(),
    }
})

module.exports = {
    IMG
}
