const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const IMG = sequelize.define('Img', {
    imgId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    name: {
        type: DataTypes.UUID(),
        defaultValue: DataTypes.UUIDV4()
    },
})

module.exports = {
    IMG
}
