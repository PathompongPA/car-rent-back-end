const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const OFFER = sequelize.define("offers", {
    id: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    offerPrice: {
        type: DataTypes.INTEGER()
    },
    offerAmountDay: {
        type: DataTypes.INTEGER()
    },
    isDelete: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }
})

module.exports = {
    OFFER
};
